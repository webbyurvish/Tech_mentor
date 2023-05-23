import { createSlice } from "@reduxjs/toolkit";

const mentorsSlice = createSlice({
  name: "mentors",
  initialState: {
    mentors: [],
  },
  reducers: {
    setMentors: (state, action) => {
      state.mentors = action.payload;
    },
  },
});

export const { setMentors } = mentorsSlice.actions;

export default mentorsSlice.reducer;
