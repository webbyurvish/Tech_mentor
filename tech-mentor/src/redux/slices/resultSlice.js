import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import { API_URL } from "../../config";

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

export const fetchData = createAsyncThunk(
  "results/fetchData",
  async (
    { technology, country, name, spokenLanguage, currentPage, isLiked, userId },
    { rejectWithValue }
  ) => {
    try {
      console.log({
        technology,
        country,
        name,
        spokenLanguage,
        currentPage,
        isLiked,
        userId,
      });
      const params = {
        technology,
        country,
        name,
        spokenLanguage,
        pageNumber: currentPage,
        pageSize: 3,
        isLiked,
        userId,
      };

      // Remove empty or null parameters from the params object
      Object.keys(params).forEach((key) => {
        if (params[key] === "" || params[key] === null) {
          delete params[key];
        }
      });

      const queryString = qs.stringify(params, { encode: false });

      // Remove pageSize parameter from the queryString
      const modifiedQueryString = queryString.replace(
        /(^|&)pageSize=([^&]*)(&|$)/,
        "$1"
      );

      const url = `/mentors${
        modifiedQueryString ? `?${modifiedQueryString}` : ""
      }`;

      const response = await axiosInstance.get(url);

      const mentors = response.data.items.filter(
        (item) => item.userId !== userId
      );

      const totalPageCount = response.data.totalPages;

      // Update URL with query parameters
      const newUrl = `${window.location.origin}${window.location.pathname}${
        modifiedQueryString ? `?${modifiedQueryString}` : ""
      }`;

      window.history.replaceState(null, null, newUrl);

      return { mentors, totalPageCount };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resultSlice = createSlice({
  name: "results",
  initialState: {
    mentors: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.mentors = action.payload.mentors;
        state.totalPages = action.payload.totalPageCount;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resultSlice.reducer;
