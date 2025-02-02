import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { http } from "../../http/client";

const inviteAdapter = createEntityAdapter({ selectId: (invite) => invite._id });

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

export const updateInvite = createAsyncThunk('invite/updateInvite', async (invite) => {
    const response = await http('/invites/' + invite._id, { method: 'PUT', body: invite });
    return response;
});

export const fetchAllInvites = createAsyncThunk('invite/fetchAllInvites', async () => {
    const response = await http('/invites?_embed=event', { method: 'GET' });
    return response;
}, {
    condition(arg, thunkApi) {
        const inviteStatus = selectInvitesStatus(thunkApi.getState());
        if (inviteStatus !== 'idle') {
            return false;
        }
    }
});


export const fetchUserInvites = 'Todo';

// export const fetchAllEvents = createAsyncThunk('invite/fetchEventInvites', async (eventId) => {
//     const response = await http('/invites?event_id=' + eventId, { method: 'GET' });
//     return response;
// }


export const inviteSlice = createSlice({
    name: 'Invite',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewInvite.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(addNewInvite.fulfilled, (state, action) => {
            state.status = 'idle';
            // state.userInvites.push(action.payload);
            inviteAdapter.addOne(state, action.payload);
        }).addCase(addNewInvite.rejected, (state, action) => {
            state.status = 'failed';
        }).addCase(fetchAllInvites.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(fetchAllInvites.fulfilled, (state, action) => {
            // state.eventInvites = action.payload;
            inviteAdapter.setAll(state, action.payload);
            state.status = 'completed';
            // state.status = 'idle';
        }).addCase(deleteInvite.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(deleteInvite.fulfilled, (state, action) => {
            // state.eventInvites = state.eventInvites.filter((val) => val.id !== action.payload.id);
            inviteAdapter.removeOne(state, action.payload);
            state.status = 'idle';
        }).addCase(deleteInvite.rejected, (state, action) => {
            state.status = 'failed'
        }).addCase(updateInvite.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(updateInvite.fulfilled, (state, action) => {
            inviteAdapter.setOne(state, action.payload);
            state.status = 'idle';
        }).addCase(updateInvite.rejected, (state, action) => {
            state.status = 'failed';
        });
    }

})

export default inviteSlice.reducer;

export const { selectAll: selectAllInvites } = inviteAdapter.getSelectors((state) => state.invite)

export const selectInvitesStatus = (state) => state.invite.status;

export const selectInvitesError = (state) => state.invite.error;

const selectId = (state, id) => id;

export const selectUserInvites = createSelector([selectAllInvites, selectId], (invites, user_id) => {
    return invites.filter((val) => val.user === user_id);
})

export const selectEventInvites = createSelector([selectAllInvites, selectId], (invites, event_id) => {
    return invites.filter((val) => val.event === event_id);
});

// (state, event_id) => {
//     const entities = Object.values(state.invite.entities);
//     return entities.filter((val) => val.envetId === event_id);
// };
