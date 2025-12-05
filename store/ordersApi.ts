import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface OrderItem {
    name: string
    quantity: number
    price: number
    id?: string
}

export interface Order {
    id: string
    user_id: string
    items: OrderItem[]
    total: number
    status: 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled'
    created_at: string
    estimated_completion_time?: string
    delivery_address: string
    customer_name?: string // Joined from profiles if needed
}

export interface CreateOrderInput {
    items: OrderItem[]
    total: number
    delivery_address: string
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers: Headers, { getState }: any) => {
            const state = getState() as { auth?: { token?: string | null } }
            const token = state?.auth?.token
            if (token) headers.set('authorization', `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // Get all orders (for Admin/Staff)
        getAllOrders: builder.query<Order[], void>({
            query: () => 'orders',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Order' as const, id })),
                        { type: 'Order', id: 'LIST' },
                    ]
                    : [{ type: 'Order', id: 'LIST' }],
        }),
        // Get my orders (for Customer)
        getMyOrders: builder.query<Order[], void>({
            query: () => 'orders/my',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Order' as const, id })),
                        { type: 'Order', id: 'MY_LIST' },
                    ]
                    : [{ type: 'Order', id: 'MY_LIST' }],
        }),
        // Create new order
        createOrder: builder.mutation<Order, CreateOrderInput>({
            query: (body) => ({
                url: 'orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Order', id: 'MY_LIST' }, { type: 'Order', id: 'LIST' }],
        }),
        // Update order status (for Admin/Staff)
        updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `orders/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
        }),
    }),
})

export const {
    useGetAllOrdersQuery,
    useGetMyOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
} = ordersApi
