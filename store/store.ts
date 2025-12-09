import { configureStore } from '@reduxjs/toolkit'
import { profileApi } from './profileApi'
import { menuApi } from './menuApi'
import { offersApi } from './offersApi'
import { ordersApi } from './ordersApi'
import { addressApi } from './addressApi'
import authReducer from './authSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [offersApi.reducerPath]: offersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefault) => getDefault().concat(profileApi.middleware, menuApi.middleware, offersApi.middleware, ordersApi.middleware, addressApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
