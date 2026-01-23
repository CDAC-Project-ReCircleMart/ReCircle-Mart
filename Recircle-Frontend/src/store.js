import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'

// create global store
export const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
})
