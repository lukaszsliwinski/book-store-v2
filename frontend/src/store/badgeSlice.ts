import { createSlice } from '@reduxjs/toolkit';

// cart badge state
const badgeSlice = createSlice({
  name: 'badge',
  initialState: {
    badge: JSON.parse(localStorage.getItem('cart') || '[]').length
  },
  reducers: {
    setBadge(state, action) {
      const value = action.payload;
      state.badge = value;
    }
  }
});

export const badgeActions = badgeSlice.actions;

export default badgeSlice;
