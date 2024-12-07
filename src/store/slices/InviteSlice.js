import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { http } from "../../http/client";

const inviteAdapter = createEntityAdapter();

const initialState = inviteAdapter.getInitialState(
    {
        status: 'idle',
        error: null,
        userInvites: [],
        eventInvites: []
    }
);

export const addNewInvite = createAsyncThunk('invite/addNewInvite', async (newInvite) => {
    const response = await http('/invites', { method: 'POST', body: newInvite })
    return response;
});

export const deleteInvite = createAsyncThunk('invite/deleteInvite', async (id) => {
    const response = await http('/invites/' + id, { method: 'DELETE' });
    return response;
})

export const fetchUserInvites = 'Todo';

export const fetchEventInvites = createAsyncThunk('invite/fetchEventInvites', async (eventId) => {
    const response = await http('/invites?event_id=' + eventId, { method: 'GET' });
    return response;
}
    , {
        condition(arg, thunkApi) {
            const inviteStatus = selectInvitesStatus(thunkApi.getState());
            console.log(inviteStatus)
            if (inviteStatus !== 'idle') {
                return false;
            }
        }
    })

export const inviteSlice = createSlice({
    name: 'Invite',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewInvite.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(addNewInvite.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userInvites.push(action.payload);
        }).addCase(addNewInvite.rejected, (state, action) => {
            state.status = 'failed';
        }).addCase(fetchEventInvites.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(fetchEventInvites.fulfilled, (state, action) => {
            state.eventInvites = action.payload;
            state.status = 'completed';
            // state.status = 'idle';
        }).addCase(deleteInvite.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(deleteInvite.fulfilled, (state, action) => {
            state.eventInvites = state.eventInvites.filter((val) => val.id !== action.payload.id);
            state.status = 'idle';
        }).addCase(deleteInvite.rejected, (state, action) => {
            state.status = 'failed'
        });
    }

})

export default inviteSlice.reducer;

export const selectInvitesStatus = (state) => state.invite.status;

export const selectInvitesError = (state) => state.invite.error;

export const selectUserInvites = (state) => state.invite.userInvites;

export const selectEventInvites = (state) => state.invite.eventInvites;