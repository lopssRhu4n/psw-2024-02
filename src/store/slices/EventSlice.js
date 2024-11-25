import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEventList = createAsyncThunk('event/fetchEventList', async () => {
    const response = await (await fetch('http://localhost:3004/events')).json();
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

export const addNewEvent = createAsyncThunk('event/addNewEvent', async (newEvent) => {
    const response = await fetch('http://localhost:3004/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
    });
    return response;
});

export const eventSlice = createSlice({
    name: 'Event',
    initialState: {
        eventList: [],
        status: 'idle',
        statusCreation: 'idle',
        error: null
    },


    reducers: {
        eventAdded: (state, action) => {
            state.eventList.push(action.payload);
        }
    },

    extraReducers:
        // {
        //     [fetchEventList.pending]: (state, action) => { console.log('state pending: ' + state) },
        //     [fetchEventList.fulfilled]: (state, action) => { console.log('state fulfilled: ' + state) },
        //     [fetchEventList.rejected]: (state, action) => { console.log('state rejected: ' + state) }
        // }
        builder => {
            builder.addCase(fetchEventList.pending, (state, action) => {
                state.status = 'pending';
            }).addCase(fetchEventList.fulfilled, (state, action) => {
                state.status = 'completed';
                state.eventList = action.payload;
            }).addCase(fetchEventList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Erro ao buscar listagem de eventos';

            }).addCase(addNewEvent.pending, (state, action) => {
                state.statusCreation = 'pending';
            }).addCase(addNewEvent.fulfilled, (state, action) => {
                state.status = 'completed';
                console.log(action.payload)
            }).addCase(addNewEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Erro ao criar evento'
            });

        }
})


export const { eventAdded } = eventSlice.actions;

export default eventSlice.reducer;

export const selectEventList = (state) => state.event.eventList;

export const selectEventsStatus = (state) => state.event.status;

export const selectEventsError = (state) => state.event.error;