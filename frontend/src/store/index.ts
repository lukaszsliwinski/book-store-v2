import { configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer
  }
});

export type IRootState = ReturnType<typeof store.getState>;    // przetestować czy konieczne

export default store;
