import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category?: string
  available?: boolean
  createdAt?: string
  updatedAt?: string
}

interface CreateMenuItemInput extends Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'> {}
interface UpdateMenuItemInput extends Partial<Omit<MenuItem, 'id'>> { id: string }

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers, { getState }: any) => {
      const state = getState() as { auth?: { token?: string | null } }
      const token = state?.auth?.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: ['Menu', 'MenuItem'],
  endpoints: (builder) => ({
    getMenus: builder.query<MenuItem[], void>({
      query: () => 'menu',
      providesTags: (result) =>
        result ? [...result.map(r => ({ type: 'MenuItem' as const, id: r.id })), { type: 'Menu', id: 'LIST' }] : [{ type: 'Menu', id: 'LIST' }]
    }),
    getMenuById: builder.query<MenuItem, string>({
      query: (id) => `menu/${id}`,
      providesTags: (result, error, id) => [{ type: 'MenuItem', id }]
    }),
    createMenu: builder.mutation<MenuItem, CreateMenuItemInput>({
      query: (body) => ({ url: 'menu', method: 'POST', body }),
      invalidatesTags: [{ type: 'Menu', id: 'LIST' }]
    }),
    updateMenu: builder.mutation<MenuItem, UpdateMenuItemInput>({
      query: ({ id, ...patch }) => ({ url: `menu/${id}`, method: 'PUT', body: patch }),
      invalidatesTags: (result, error, arg) => [{ type: 'MenuItem', id: arg.id }]
    }),
    deleteMenu: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `menu/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'MenuItem', id }]
    })
  })
})

export const { 
  useGetMenusQuery, 
  useGetMenuByIdQuery, 
  useCreateMenuMutation, 
  useUpdateMenuMutation, 
  useDeleteMenuMutation 
} = menuApi
