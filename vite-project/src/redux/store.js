import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import tempUserSlice from './user/tempUserSlice.js';
import { persistReducer, persistStore } from 'redux-persist';


 
//redux persis is used internally to remember user data , redux alone cant do it on refresh the user data is cleared


// Combine reducers
const rootReducer = combineReducers({
  User1: tempUserSlice,
});

// Configure persistence
const persistConfig = {
  key: 'rootweb',
  storage,
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store1 = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure persistor
export const persistor = persistStore(store1);
