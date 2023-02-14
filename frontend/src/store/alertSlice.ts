import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    error: false,
    alertMessage: '',
    showAlert: false
  },
  reducers: {
    setError(state, action) {
      const value = action.payload;
      state.error = value;
    },
    setAlertMessage(state, action) {
      const value = action.payload;
      state.alertMessage = value;
    },
    setShowAlert(state, action) {
      const value = action.payload;
      state.showAlert = value;
    }
  }
});

export const alertActions = alertSlice.actions;

export default alertSlice;
