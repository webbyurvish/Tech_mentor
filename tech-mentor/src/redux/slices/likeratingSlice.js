import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchData } from "./resultSlice";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

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
      const response = await axiosInstance.post("/rating", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      const response = await axiosInstance.post("/like", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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
