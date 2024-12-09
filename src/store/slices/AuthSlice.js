import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { http } from "../../http/client";
import { retrieveUserFromLocalStorage } from "../../utils/utils";

let initialUser = retrieveUserFromLocalStorage();

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState(
  {
    user: initialUser,
    authError: '',
    status: 'idle',
    creationStatus: 'idle',
    error: ''
  }
);

export const fetchUsersList = createAsyncThunk('auth/fetchUsers', async () => {
  const response = await http('/users');
  return response;
},
  {
    condition: (arg, thunkApi) => {
      const fetchStatus = selectCurrentAuthStatus(thunkApi.getState());
      return !(fetchStatus !== 'idle');
    }
  }
);

export const registerNewUser = createAsyncThunk('auth/registerNewUser', async (newUser) => {
  const response = await http('/users', { method: 'POST', body: newUser });
  return response;
})

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      // Realizando login "local"
      const userList = Object.values(state.entities);
      const userMatched = userList.find((val) => val.email === action.payload.email && val.password === action.payload.password);

      if (userMatched) {
        state.user = userMatched;
        state.authError = '';

        localStorage.setItem('evente-se-auth', JSON.stringify(state.user) + '|' + new Date().toISOString());
        return;
      }

      state.authError = 'Credenciais inválidas.';

    },

    userLoggedOut: (state, action) => {
      state.user = {};
      localStorage.removeItem('evente-se-auth');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersList.pending, (state, action) => {
      state.status = 'pending';
    }).addCase(fetchUsersList.fulfilled, (state, action) => {
      authAdapter.setAll(state, action.payload);
      state.status = 'completed';
    }).addCase(fetchUsersList.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Erro ao buscar listagem de usuários';
    }).addCase(registerNewUser.pending, (state) => {
      state.creationStatus = 'pending';
    }).addCase(registerNewUser.fulfilled, (state, action) => {
      authAdapter.addOne(state, action.payload);
      state.user = action.payload;
      localStorage.setItem('evente-se-auth', JSON.stringify(state.user) + '|' + new Date().toISOString());
      state.creationStatus = 'completed';
    }).addCase(registerNewUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = 'Erro ao registrar-se.';
    });
    ;
  }

});

export default authSlice.reducer;

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const { selectAll: selectAllUsers, selectById: selectUserById } = authAdapter.getSelectors((state) => state.auth);

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => Object.keys(state.auth.user).length;

export const selectCurrentAuthStatus = (state) => state.auth.status;

export const selectUsersStatus = (state) => state.user.status;

export const selectAuthError = (state) => state.auth.authError;

const selectId = (state, id) => id;

export const selectAvailableUsersForEvent = createSelector([selectAllUsers, selectId], (users, ownerId) => {
  return users.filter(val => val.id !== ownerId);
});
