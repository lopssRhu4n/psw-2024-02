import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { http } from "../../http/client";

let initialUser = {};

const authAdapter = createEntityAdapter({ selectId: (user) => user._id });
const token = localStorage.getItem('eventese-token');
if (token) {
  const res = await http('/users/refresh', { method: 'GET' });
  initialUser = res.user;
}

const initialState = authAdapter.getInitialState(
  {
    user: initialUser,
    authError: '',
    status: 'idle',
    creationStatus: 'idle',
    error: '',
    token
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

// export const userRefresh = createAsyncThunk('auth/userRefresh', async () => {
//   const response = await http('/users/refresh', { method: 'GET' });
//   return response;
// }, {
//   condition: (arg, thunkApi) => {
//     const fetchStatus = selectCurrentAuthStatus(thunkApi.getState());
//     return !(fetchStatus !== 'idle');
//   }
// },
// );

export const registerNewUser = createAsyncThunk('auth/registerNewUser', async (newUser) => {
  const response = await http('/users/register', { method: 'POST', body: newUser });
  return response;
})

export const userLoggedIn = createAsyncThunk('auth/login', async (loginData) => {
  const response = await http('/users/login', { method: 'POST', body: loginData });
  return response;
});

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
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
    }).addCase(userLoggedIn.pending, (state, action) => {
      state.status = 'pending';
    }).addCase(userLoggedIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('eventese-token', state.token);
      state.status = 'completed';
    }).addCase(userLoggedIn.rejected, (state, action) => {
      state.status = 'failed';
      state.error = 'Erro ao logar usuário.'
    })
    // .addCase(userRefresh.pending, (state, action) => {
    //   state.status = 'pending';
    // }).addCase(userRefresh.fulfilled, (state, action) => {
    //   state.user = action.payload.user;
    //   state.status = 'completed';
    // });

  }

});

export default authSlice.reducer;

export const { userLoggedOut } = authSlice.actions;

export const { selectAll: selectAllUsers, selectById: selectUserById } = authAdapter.getSelectors((state) => state.auth);

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => Object.keys(state.auth.user).length;

export const selectCurrentAuthStatus = (state) => state.auth.status;

export const selectUsersStatus = (state) => state.user.status;

export const selectAuthError = (state) => state.auth.authError;

export const selectAuthToken = (state) => state.auth.token;

const selectId = (state, _id) => _id;

export const selectAvailableUsersForEvent = createSelector([selectAllUsers, selectId], (users, ownerId) => {
  return users.filter(val => val._id !== ownerId);
});
