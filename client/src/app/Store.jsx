import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/state/AuthReducer'

export const Store = configureStore({
  reducer:{
    authReducer: authReducer
  }
})