import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
