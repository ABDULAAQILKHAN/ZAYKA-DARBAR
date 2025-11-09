import { configureStore } from '@reduxjs/toolkit'
import { profileApi } from './profileApi'
import { menuApi } from './menuApi'
import { offersApi } from './offersApi'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [offersApi.reducerPath]: offersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().concat(profileApi.middleware, menuApi.middleware, offersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
