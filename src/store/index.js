import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/EventSlice';

export default configureStore({
    reducer: { event: eventReducer }
})