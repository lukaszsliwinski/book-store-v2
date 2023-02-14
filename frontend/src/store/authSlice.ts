import { createSlice } from '@reduxjs/toolkit';

import { getToken } from '../utils';

const token = getToken();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: token ? true : false,
    username: ''
  },
  reducers: {
    setLogged(state, action) {
      const value = action.payload;
      state.logged = value;
    },
    setUsername(state, action) {
      const value = action.payload;
      state.username = value;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;
