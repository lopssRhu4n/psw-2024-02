import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { http } from "../../http/client";

export const addNewFeedback = createAsyncThunk('feedback/addNewFeedback', async (feedback) => {
    const response = await http('/feedbacks', { method: 'POST', body: feedback });
    return response;
});

export const fetchAllFeedbacks = createAsyncThunk('feedback/fetchAllFeedbacks', async () => {
    const response = await http('/feedbacks');
    return response;
}, {
    condition(arg, thunkApi) {
        const feedbackStatus = selectFeedbackStatus(thunkApi.getState());
        if (feedbackStatus !== 'idle') {
            return false;
        }
    }
});

export const updateFeedback = createAsyncThunk('feedback/updateFeedback', async (feedback) => {
    const response = await http('/feedbacks/' + feedback.id, { method: 'PUT', body: feedback });
    return response;
})

export const deleteFeedback = createAsyncThunk('feedback/deleteFeedback', async (id) => {
    const response = await http('/feedbacks/' + id, { method: 'DELETE' });
    return response;
});

const feedbackAdapter = createEntityAdapter();

const initialState = feedbackAdapter.getInitialState({
    status: 'idle',
    error: '',
});

export const feedbackSlice = createSlice({
    name: 'Feedback',
    initialState,
    extraReducers: builder => {
        builder.addCase(addNewFeedback.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(addNewFeedback.fulfilled, (state, action) => {
            feedbackAdapter.addOne(state, action.payload);
            state.status = 'idle';
            state.error = '';
        }).addCase(addNewFeedback.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Erro ao criar novo feedback';
        }).addCase(fetchAllFeedbacks.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
            feedbackAdapter.setAll(state, action.payload);
            state.status = 'completed';
            state.error = '';
        }).addCase(fetchAllFeedbacks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Erro ao listar feedbacks.';
        }).addCase(updateFeedback.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(updateFeedback.fulfilled, (state, action) => {
            feedbackAdapter.updateOne(state, action.payload);
            state.status = 'idle';
            state.error = '';
        }).addCase(updateFeedback.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Falha ao atualizar feedback.';
        }).addCase(deleteFeedback.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(deleteFeedback.fulfilled, (state, action) => {
            feedbackAdapter.removeOne(state, action.payload.id);
            state.status = 'idle';
            state.error = '';
        }).addCase(deleteFeedback.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Erro ao excluir Feedback.';
        })

    }
})

export default feedbackSlice.reducer;

export const { selectAll: selectAllFeedbacks } = feedbackAdapter.getSelectors();

export const selectFeedbackStatus = (state) => state.feedback.status;

export const selectUserFeedbacks = (state, userId) => {
    const feedbacks = Object.values(state.feedback.entities);
    return feedbacks.filter((feedback) => feedback.userId === userId);

}