import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { batch } from "react-redux";

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
    // Handle the response if needed
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addMentor = createAsyncThunk(
  "mentors/add",
  async (mentorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/mentors/add", mentorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to approve a request
export const approveRequest = createAsyncThunk(
  "requests/approve",
  async (email) => {
    try {
      const response = await axiosInstance.put(
        "/admin/approve",
        JSON.stringify(email)
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Thunk action to reject a request
export const rejectRequest = createAsyncThunk(
  "requests/reject",
  async ({ email, rejectmessage }) => {
    console.log(email, rejectmessage);
    try {
      const response = await axiosInstance.delete("/admin/reject", {
        data: { email, rejectmessage },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

// Thunk action to fetch mentor requests
export const fetchRequests = createAsyncThunk(
  "requests/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/requests");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mentorsSlice = createSlice({
  name: "mentors",
  initialState: {
    requests: [],
    mentors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMentor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMentor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(addMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload);
      })
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        batch(() => {
          toast.success(action.payload.message);
          state.requests = state.requests.filter(
            (request) => request.email !== action.meta.arg
          );
        });
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(rejectRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        batch(() => {
          toast.success(action.payload.message);
          state.requests = state.requests.filter(
            (request) => request.email !== action.meta.arg.email
          );
        });
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default mentorsSlice.reducer;
