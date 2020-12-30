import { configureStore } from '@reduxjs/toolkit';

// Slices
import {
  authSlice,
  loginSlice,
} from '../../containers/LoginForm/LoginFormReducer';

const reducer = {
  login: loginSlice.reducer,
  auth: authSlice.reducer,
};

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
