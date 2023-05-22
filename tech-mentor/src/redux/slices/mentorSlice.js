// mentorsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

// Async thunk for fetching mentor details by email ID
export const fetchMentorByEmail = createAsyncThunk(
  "mentors/fetchMentorByEmail",
  async (email) => {
    const response = await axios.get(`${API_URL}/mentors/get/${email}`);
    return response.data;
  }
);

export const fetchAllMentors = createAsyncThunk(
  "mentors/fetchAllMentors",
  async () => {
    const response = await axios.get(`${API_URL}/mentors/all`);
    return response.data;
  }
);

// Mentor slice
const mentorSlice = createSlice({
  name: "mentors",
  initialState: {
    mentor: null,
    mentors: [], // Add mentors array to store all mentors
    loading: false,
    error: null,
  },
  reducers: {
    logoutMentor: (state) => {
      state.mentor = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentorByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.mentor = action.payload;
      })
      .addCase(fetchMentorByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //   .addCase(fetchAllMentors.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchAllMentors.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.mentors = action.payload;
    //   })
    //   .addCase(fetchAllMentors.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export default mentorSlice.reducer;
export const { logoutMentor } = mentorSlice.actions;
