import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import { API_URL } from "../../config";
import youtube from "../../Youtube/youtube";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchVideos = createAsyncThunk(
  "results/fetchVideos",
  async (searchterm, { rejectWithValue }) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: searchterm,
        },
      });

      //   // Remove empty or null parameters from the params object
      //   Object.keys(params).forEach((key) => {
      //     if (params[key] === "" || params[key] === null) {
      //       delete params[key];
      //     }
      //   });

      //   const queryString = qs.stringify(params, { encode: false });

      //   // Remove pageSize parameter from the queryString
      //   const modifiedQueryString = queryString.replace(
      //     /(^|&)pageSize=([^&]*)(&|$)/,
      //     "$1"
      //   );

      //   const url = `/mentors${
      //     modifiedQueryString ? `?${modifiedQueryString}` : ""
      //   }`;

      //   const response = await axiosInstance.get(url);

      //   const mentors = response.data.items.filter(
      //     (item) => item.userId !== userId
      //   );

      //   const totalPageCount = response.data.totalPages;

      // Update URL with query parameters
      //   const newUrl = `${window.location.origin}${window.location.pathname}${
      //     modifiedQueryString ? `?${modifiedQueryString}` : ""
      //   }`;

      //   window.history.replaceState(null, null, newUrl);

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
        // state.mentors = action.payload.mentors;
        // state.totalPages = action.payload.totalPageCount;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = videoSlice.actions;

export default videoSlice.reducer;
