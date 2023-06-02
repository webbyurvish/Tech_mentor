import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import { fetchData } from "./resultSlice";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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

// thunk for submit rating
export const submitRating = createAsyncThunk(
  "ratings/submit",
  async ({ userId, mentorId, comment, stars }, { rejectWithValue }) => {
    const data = {
      userId,
      mentorId,
      comment,
      stars,
    };

    try {
      const response = await axiosInstance.post("/rating", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// thunk for adding like
export const addLike = createAsyncThunk(
  "like/submit",
  async (
    { userId, mentorId, filters, currentPage, navigate, dispatch },
    { rejectWithValue }
  ) => {
    const data = { userId, mentorId, filters, currentPage, navigate, dispatch };

    try {
      const response = await axiosInstance.post("/like", data);
      dispatch(
        fetchData({
          technology: filters.technology,
          country: filters.country,
          name: filters.name,
          spokenLanguage: filters.spokenLanguage,
          currentPage,
          isLiked: filters.isLiked,
          userId,
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const likeratingSlice = createSlice({
  name: "likerating",
  initialState: {
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeratingSlice.reducer;
