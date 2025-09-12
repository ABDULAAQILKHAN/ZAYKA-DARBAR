// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client that can authenticated requests
 const supabase:any = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is set, update the request cookies and response cookies
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the request cookies and response cookies
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )


  // It's crucial to call this before any logic that relies on the user's auth state.
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const userRole = user?.user_metadata?.role || 'customer'

  // Define route groups
  const protectedRoutes = ['/orders', '/admin', '/checkout', '/cart', '/profile']
  const adminRoutes = ['/admin']
  const authRoutes = ['/auth/login', '/auth/signup']

  // Redirect authenticated users from auth pages
  if (user && authRoutes.some(route => pathname.startsWith(route))) {
    const redirectUrl = userRole === 'admin' ? '/admin' : '/menu'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Redirect unauthenticated users from protected pages
  if (!user && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirect non-admin users from admin pages
  if (user && userRole !== 'admin' && adminRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/menu', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}