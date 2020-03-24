import { configureStore, getDefaultMiddleware, Middleware } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';
import featuresReducer from './features';

type RootState = ReturnType<typeof featuresReducer>

export default configureStore({ 
  reducer: featuresReducer,
  middleware: [...getDefaultMiddleware<RootState>(), logger as Middleware]
});