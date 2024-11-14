import { configureStore } from "@reduxjs/toolkit";
import  userSliceReducer  from "../features/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    userInfo: userSliceReducer
  }
});
