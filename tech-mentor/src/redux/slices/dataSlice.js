import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config";
import axios from "axios";
import createAxiosInstance from "../../Axios/axiosInstance";

// Create an instance of axios with interceptor
const axiosInstance = createAxiosInstance();

const dataSlice = createSlice({
  name: "data",
  initialState: {
    countries: [],
    skills: [],
    languages: [],
    currentPage: 1,
    selectedStars: 0,
    users: null,
    likesCount: 0,
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedStars: (state, action) => {
      state.selectedStars = action.payload;
    },
    setMentor: (state, action) => {
      state.mentor = action.payload;
    },
  },
});

export const {
  setCountries,
  setLanguages,
  setSkills,
  setCurrentPage,
  setSelectedStars,
  setMentor,
  setOldPassword,
  setNewPassword,
} = dataSlice.actions;

export const fetchCountries = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/data/countries");
    dispatch(setCountries(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchLanguages = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/data/languages");
    dispatch(setLanguages(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSkills = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/data/skills");
    dispatch(setSkills(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchMentorDetails =
  (email, includeAuthorization = true) =>
  async (dispatch) => {
    try {
      const config = includeAuthorization
        ? {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        : {};

      const response = await axiosInstance.get(`/mentors/get/${email}`, config);
      dispatch(setMentor(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export default dataSlice.reducer;
