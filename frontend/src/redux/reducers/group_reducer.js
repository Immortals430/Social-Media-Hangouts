import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    SET_GROUPS: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const groupReducer = groupSlice.reducer;
export const { SET_GROUPS } = groupSlice.actions;
export const groupSelector = (state) => state.groupReducer;
