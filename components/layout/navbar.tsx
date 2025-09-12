"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useCart } from "@/hooks/use-cart"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "../providers/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"

const getNavItems = (userRole?: string, isAuthenticated?: boolean) => {
  const baseItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Contact", href: "/contact" }
  ]

  // Only show Orders if user is logged in as customer
  if (isAuthenticated && userRole === 'customer') {
    baseItems.push({ name: "My orders", href: "/orders" })
  }

  // Only show Admin if user is admin (hidden for now as requested)
  if (userRole === 'admin') {
    baseItems.length = 0;
    baseItems.push({ name: "Admin", href: "/admin" })
  }

  return baseItems
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const  navItems = getNavItems(profile?.role, !!user)
  const data = useAuth();
  
  useEffect(() => {
    const fetchUser = async () => {
      if(data?.error){
        console.error('Error fetching user in Navbar:', data.error)
        toast.error('Error fetching user data')
        setError(data.error)
        return
      }
      try{
        setIsLoading(true)
        setUser(data?.user)
        setProfile(data.profile)
        //const { data, error } = await supabase.auth.getUser()
        // setProfile(data.user.user_metadata)
      }catch{
        toast.error('An unexpected error occurred');
        setError('An unexpected error occurred')
      }finally{
        setIsLoading(false)
      }
      }
    fetchUser()
  }, [data])


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push("/auth/login")
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-2xl font-bold text-zayka-600 dark:text-zayka-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Zayka
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-zayka-600 dark:hover:text-zayka-400",
                  pathname === item.href ? "text-zayka-600 dark:text-zayka-400" : "text-foreground/70",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {profile && profile?.role === 'customer' && (
                <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zayka-600 text-xs text-white">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* Authentication Section */}
            {isLoading ? (
              <div className="hidden md:block">
                <Button variant="ghost" size="sm" disabled>
                  Loading...
                </Button>
              </div>
            ) : user != null ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      {profile?.first_name[0] +  profile?.last_name[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem disabled>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {profile?.full_name || `${profile?.first_name} ${profile?.last_name}` || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {profile && profile?.role === 'customer' &&  <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        My Orders
                      </Link>
                    </DropdownMenuItem>}
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <div className="hidden md:block">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                </div>

                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container h-full px-4 flex flex-col">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="text-2xl font-bold text-zayka-600 dark:text-zayka-400">Zayka</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium py-2 transition-colors hover:text-zayka-600 dark:hover:text-zayka-400",
                      pathname === item.href ? "text-zayka-600 dark:text-zayka-400" : "text-foreground/70",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto mb-8 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {profile?.full_name || `${profile?.first_name} ${profile?.last_name}` || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <Link href="/orders" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        My Orders
                      </Button>
                    </Link>
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      className="w-full" 
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
