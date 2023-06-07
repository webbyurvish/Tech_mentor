// filtersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  technology: "",
  country: "",
  name: "",
  spokenLanguage: "",
  isLiked: false,
  isMostLiked: false,
  isTopRated: false,
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
    setTopRated: (state, action) => {
      state.isTopRated = action.payload;
    },
    setMostLiked: (state, action) => {
      state.isMostLiked = action.payload;
    },
    resetallfilters: (state, action) => {
      state.technology = "";
      state.country = "";
      state.name = "";
      state.spokenLanguage = "";
      state.isLiked = false;
    },
  },
});

export const {
  setTechnology,
  setCountry,
  setName,
  setSpokenLanguage,
  setLiked,
  setMostLiked,
  setTopRated,
} = filtersSlice.actions;

export default filtersSlice.reducer;
