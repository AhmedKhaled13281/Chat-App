import { configureStore } from '@reduxjs/toolkit';

// Slices (Reducers)
import authReducer from './authReducer';
import chatReducer from './chatReducer';

export const store = configureStore({
  reducer: { auth: authReducer, chat: chatReducer },
});