import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

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

export const handleResetPasswordSubmit = createAsyncThunk(
  "passwordChange/submit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/account/changepassword",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const accountSlice = createSlice({
  name: "passwordChange",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleResetPasswordSubmit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleResetPasswordSubmit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(handleResetPasswordSubmit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      });
  },
});

export default accountSlice.reducer;
