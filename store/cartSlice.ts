import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: string
    cartItemId: string // Unique ID for this specific cart entry (id + size)
    name: string
    price: number
    image: string
    quantity: number
    size?: string // "Full" | "Half"
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'cartItemId'> & { cartItemId?: string }>) => {
            const newItem = action.payload;
            // Generate a cartItemId if not provided, based on ID and size
            const cartItemId = newItem.cartItemId || `${newItem.id}-${newItem.size || 'default'}`;

            const existingItem = state.items.find((item) => item.cartItemId === cartItemId)

            if (existingItem) {
                existingItem.quantity += newItem.quantity
            } else {
                state.items.push({
                    ...newItem,
                    cartItemId
                })
            }
            saveToLocalStorage(state)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            // Payload is now cartItemId
            state.items = state.items.filter((item) => item.cartItemId !== action.payload)
            saveToLocalStorage(state)
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            // Payload id is now cartItemId
            const item = state.items.find((item) => item.cartItemId === action.payload.id)
            if (item) {
                if (action.payload.quantity === 0) {
                    state.items = state.items.filter((i) => i.cartItemId !== action.payload.id)
                } else {
                    item.quantity = action.payload.quantity
                }
            }
            saveToLocalStorage(state)
        },
        clearCart: (state) => {
            state.items = []
            saveToLocalStorage(state)
        },
        loadCart: (state) => {
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem('cart')
                if (stored) {
                    try {
                        state.items = JSON.parse(stored).items
                    } catch (e) {
                        console.error('Failed to load cart from local storage', e)
                    }
                }
            }
        }
    }
})

function saveToLocalStorage(state: CartState) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state))
    }
}

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions
export default cartSlice.reducer
