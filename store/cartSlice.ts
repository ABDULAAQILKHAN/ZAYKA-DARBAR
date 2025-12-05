import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }
            saveToLocalStorage(state)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            saveToLocalStorage(state)
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id)
            if (item) {
                if (action.payload.quantity === 0) {
                    state.items = state.items.filter((i) => i.id !== action.payload.id)
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
