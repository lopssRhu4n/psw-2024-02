import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { http } from "../../http/client";

const eventsAdapter = createEntityAdapter();

const initialState = eventsAdapter.getInitialState(
    {
        status: 'idle',
        statusCreation: 'idle',
        error: null
    }
);

export const fetchEventList = createAsyncThunk('event/fetchEventList', async () => {
    const response = await http('/events');
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
    const response = await http('/events', { method: 'POST', body: newEvent });
    return response;
});

export const updateEvent = createAsyncThunk('event/updateEvent', async (eventData) => {
    const response = await http('/events/' + eventData.id, { method: 'PUT', body: eventData });
    return response;
})

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id) => {
    const response = await http('/events/' + id, { method: 'DELETE' });
    return response;
})

export const eventSlice = createSlice({
    name: 'Event',
    initialState,
    reducers: {},
    extraReducers:
        builder => {
            builder.addCase(fetchEventList.pending, (state, action) => {
                state.status = 'pending';
            }).addCase(fetchEventList.fulfilled, (state, action) => {
                state.status = 'completed';
                eventsAdapter.setAll(state, action.payload)
            }).addCase(fetchEventList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Erro ao buscar listagem de eventos';
            }).addCase(addNewEvent.pending, (state, action) => {
                state.statusCreation = 'pending';
            }).addCase(addNewEvent.fulfilled, (state, action) => {
                state.statusCreation = 'completed';
                eventsAdapter.addOne(state, action.payload);
                state.status = 'idle';
            }).addCase(addNewEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Erro ao criar evento'
            }).addCase(updateEvent.fulfilled, (state, action) => {
                eventsAdapter.setOne(state, action.payload);
                state.status = 'idle';
            }).addCase(deleteEvent.pending, (state, action) => {
                state.status = 'pending';
            }).addCase(deleteEvent.rejected, (state, action) => {
                state.status = 'failed';
            }).addCase(deleteEvent.fulfilled, (state, action) => {
                eventsAdapter.removeOne(state, action.payload.id);
                state.status = 'idle'
            });

        }
})

export default eventSlice.reducer;

export const { selectAll: selectAllEvents, selectById: selectEventById, selectIds: selectEventsIds } = eventsAdapter.getSelectors((state) => state.event);

export const selectEventsStatus = (state) => state.event.status;

export const selectEventsError = (state) => state.event.error;