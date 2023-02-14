import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import alertSlice from './alertSlice';
import badgeSlice from './badgeSlice';
import modeSlice from './modeSlice';
import authSlice from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  badge: badgeSlice.reducer,
  mode: modeSlice.reducer,
  auth: authSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type IRootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
