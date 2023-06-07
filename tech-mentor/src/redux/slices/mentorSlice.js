import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

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
