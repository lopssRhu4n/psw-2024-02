import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/EventSlice';
import authReducer from './slices/authReducer';

export const store = configureStore({
    reducer: { event: eventReducer, auth: authReducer }
})

