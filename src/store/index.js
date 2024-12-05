import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/EventSlice';
import authReducer from './slices/AuthSlice';
import inviteReducer from './slices/InviteSlice';

export const store = configureStore({
    reducer: { event: eventReducer, auth: authReducer, invite: inviteReducer }
})

