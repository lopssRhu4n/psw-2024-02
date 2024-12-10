import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice(
    {
        name: 'global',
        initialState: {
            isLoading: false
        },
        reducers: {
            setLoading: (state, action) => { state.isLoading = action.payload }
        }
    }
)

export const { setLoading } = globalSlice.actions;

export default globalSlice.reducer;

export const selectIsLoading = (state) => state.global.isLoading;