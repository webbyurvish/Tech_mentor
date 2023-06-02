import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// thunk for adding like
export const updateMentorDetails = createAsyncThunk(
  "mentor/update",
  async ({ mentorData, dispatch }, { rejectWithValue }) => {
    try {
      await axiosInstance.put("/mentors/update", mentorData);
      dispatch(getMentorDetails(mentorData.email));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMentorDetails = createAsyncThunk(
  "mentor/get",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/mentors/get/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    details: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMentorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMentorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload);
      })
      .addCase(updateMentorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMentorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMentorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.details = action.payload;
      })
      .addCase(getMentorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorSlice.reducer;
