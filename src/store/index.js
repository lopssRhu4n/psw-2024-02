import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/EventSlice';

export const store = configureStore({
    reducer: { event: eventReducer }
})