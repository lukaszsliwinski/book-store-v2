import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    showAlert: false,
    alertMessage: ''
  },
  reducers: {
    setShowAlert(state, action) {
      const value = action.payload;
      state.showAlert = value;
    },
    setAlertMessage(state, action) {
      const value = action.payload;
      state.alertMessage = value;
    }
  }
});

export const alertActions = alertSlice.actions;

export default alertSlice;
