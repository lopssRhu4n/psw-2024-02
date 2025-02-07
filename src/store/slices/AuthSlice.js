import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { http, httpFormData } from "../../http/client";

let initialUser = {};

const authAdapter = createEntityAdapter({ selectId: (user) => user._id });
const token = localStorage.getItem('eventese-token');
if (token) {
  try {
    const res = await http('/users/refresh', { method: 'GET' });
    initialUser = res.user;

  } catch (error) {
    console.log(error)
  }
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
  const response = await httpFormData('/users/register', { method: 'POST' }, newUser);
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
      localStorage.removeItem('eventese-token');
    },
    changeAuthStatus: (state, action) => {
      state.status = action.payload;
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
      authAdapter.addOne(state, action.payload.user);
      state.user = action.payload.user;
      state.token = action.payload.token
      localStorage.setItem('eventese-token', state.token);
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

export const { userLoggedOut, changeAuthStatus } = authSlice.actions;

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
