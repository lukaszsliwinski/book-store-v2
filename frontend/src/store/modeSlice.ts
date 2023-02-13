import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    darkMode: localStorage.getItem('mode') === 'dark' ? true : false
  },
  reducers: {
    setDarkMode(state, action) {
      const value = action.payload;
      state.darkMode = value;
    }
  }
});

export const modeActions = modeSlice.actions;

export default modeSlice;
