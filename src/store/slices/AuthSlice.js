import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState(
  {
    user: {},
    authError: '',
    status: 'idle',
    creationStatus: 'idle',
    error: ''
  }
);

export const fetchUsersList = createAsyncThunk('auth/fetchUsers', async () => {
  const response = await (await fetch('http://localhost:3004/users')).json();
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
  const response = await (await fetch('http://localhost:3004/users', {
    method: 'POST',
    body: JSON.stringify(newUser)
  })).json();

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
        return;
      }

      state.authError = 'Credenciais inválidas.';

    },

    userLoggedOut: (state, action) => {
      state.user = {}
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

export const { selectAll: selectAllUsers } = authSlice.getSelectors((state) => state.user);

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => Object.keys(state.auth.user).length;

export const selectCurrentAuthStatus = (state) => state.auth.status;

export const selectUsersStatus = (state) => state.user.status;

export const selectAuthError = (state) => state.auth.authError;
