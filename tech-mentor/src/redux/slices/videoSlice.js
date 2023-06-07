import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import youtube from "../../Youtube/youtube";

export const fetchVideos = createAsyncThunk(
  "results/fetchVideos",
  async (searchterm, { rejectWithValue }) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: searchterm,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    searchterm: "",
    // totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchterm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.videos = action.payload.items;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = videoSlice.actions;

export default videoSlice.reducer;
