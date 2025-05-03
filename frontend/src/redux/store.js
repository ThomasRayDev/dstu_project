import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectsReducer from './slices/projectsSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    error: errorReducer,
  },
});
