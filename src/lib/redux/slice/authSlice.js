import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null, isLogedin: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, { payload }) {
      state.user = payload;
      state.isLogedin = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isLogedin = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
