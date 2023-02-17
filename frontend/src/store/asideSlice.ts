import { createSlice } from '@reduxjs/toolkit';

const asideSlice = createSlice({
  name: 'aside',
  initialState: {
    showAside: undefined
  },
  reducers: {
    setShowAside(state, action) {
      const value = action.payload;
      state.showAside = value;
    }
  }
});

export const asideActions = asideSlice.actions;

export default asideSlice;
