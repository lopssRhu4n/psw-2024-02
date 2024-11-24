import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEventList = createAsyncThunk('event/fetchEventList', async () => {
    const response = await (await fetch('http://localhost:3004/events')).json();
    console.log(response)
    return response;

}
    , {
        condition(arg, thunkApi) {
            const postStatus = selectEventsStatus(thunkApi.getState());
            if (postStatus !== 'idle') {
                return false;
            }
        }
    });

export const eventSlice = createSlice({
    name: 'Event',
    initialState: {
        eventList: [],
        status: 'idle',
        error: null
    },


    reducers: {
        eventAdded: (state, action) => {
            state.eventList.push(action.payload);
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchEventList.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(fetchEventList.fulfilled, (state, action) => {
            state.status = 'completed';
            console.log(action.payload);
            state.eventList = action.payload;
        }).addCase(fetchEventList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Erro desconhecido';

        });

    }
})


export const { eventAdded } = eventSlice.actions;

export default eventSlice.reducer;

export const selectEventList = (state) => state.event.eventList;

export const selectEventsStatus = (state) => state.event.status;

export const selectEventsError = (state) => state.event.error;