import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { http } from "../../http/client";

const inviteAdapter = createEntityAdapter();

const initialState = inviteAdapter.getInitialState(
    {
        status: 'idle',
        error: null,
        userInvites: []
    }
);

export const addNewInvite = createAsyncThunk('invite/addNewInvite', async (newInvite) => {
    const response = await http('/invites', { method: 'POST', body: newInvite })
    return response;
});

export const fetchUserInvites = 'Todo';

export const fetchEventInvites = 'Todo';

export const inviteSlice = createSlice({
    name: 'Invite',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewInvite.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(addNewInvite.fulfilled, (state, action) => {
            state.status = 'completed';
            state.userInvites.push(action.payload);
        }).addCase(addNewInvite.rejected, (state, action) => {
            state.status = 'failed';
        });
    }

})

export default inviteSlice.reducer;

export const selectInvitesStatus = (state) => state.invite.status;

export const selectInvitesError = (state) => state.invite.error;

export const selectUserInvites = (state) => state.invite.userInvites;
