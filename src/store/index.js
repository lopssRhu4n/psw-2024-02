import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/EventSlice';
import authReducer from './slices/AuthSlice';
import inviteReducer from './slices/InviteSlice';
import feedbackReducer from './slices/FeedbackSlice';
import globalReducer from './slices/GlobalSlice';

export const store = configureStore({
    reducer: { event: eventReducer, auth: authReducer, invite: inviteReducer, feedback: feedbackReducer, global: globalReducer }
})

