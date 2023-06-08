import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../Axios/axiosInstance";

// // Create an instance of axios with interceptor

const axiosInstance = createAxiosInstance();

// Thunk action to fetch countries
export const fetchCountries = createAsyncThunk(
  "countries/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/data/countries");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to fetch all mentors
export const fetchAllMentors = createAsyncThunk(
  "mentors/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/mentors/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to fetch languages
export const fetchLanguages = createAsyncThunk(
  "languages/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/data/languages");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to fetch skills
export const fetchSkills = createAsyncThunk(
  "skills/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/data/skills");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to fetch mentor details
export const fetchMentor = createAsyncThunk(
  "mentor/fetch",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/mentors/get/${email}`, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    countries: [],
    skills: [],
    languages: [],
    mentors: [],
    currentPage: 1,
    selectedStars: 0,
    likesCount: 0,
    error: null,
    loading: false,
    mentor: null,
    feedbackMessage: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedStars: (state, action) => {
      state.selectedStars = action.payload;
    },
    setFeedbackMessage: (state, action) => {
      state.feedbackMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMentor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.mentor = action.payload;
      })
      .addCase(fetchMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.mentors = action.payload;
      })
      .addCase(fetchAllMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentPage,
  setSelectedStars,
  setOldPassword,
  setNewPassword,
  setFeedbackMessage,
} = dataSlice.actions;

export default dataSlice.reducer;
