// filtersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  technology: "",
  country: "",
  name: "",
  spokenLanguage: "",
  isLiked: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTechnology: (state, action) => {
      state.technology = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSpokenLanguage: (state, action) => {
      state.spokenLanguage = action.payload;
    },
    setLiked: (state, action) => {
      state.isLiked = action.payload;
    },
  },
});

export const {
  setTechnology,
  setCountry,
  setName,
  setSpokenLanguage,
  setLiked,
} = filtersSlice.actions;

export default filtersSlice.reducer;
