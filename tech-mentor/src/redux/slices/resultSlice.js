import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import { API_URL } from "../../config";

const resultSlice = createSlice({
  name: "results",
  initialState: {
    mentors: [],
    totalPages: 0,
  },
  reducers: {
    setMentors: (state, action) => {
      state.mentors = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setMentors, setTotalPages, updateMentor } = resultSlice.actions;

export const fetchData =
  (technology, country, name, spokenLanguage, currentPage, isLiked, userId) =>
  async (dispatch) => {
    try {
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

      const url = `${API_URL}/mentors${
        modifiedQueryString ? `?${modifiedQueryString}` : ""
      }`;

      const response = await axios.get(url, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      dispatch(setMentors(response.data.items));
      dispatch(setTotalPages(response.data.totalPages));

      // Update URL with query parameters
      const newUrl = `${window.location.origin}${window.location.pathname}${
        modifiedQueryString ? `?${modifiedQueryString}` : ""
      }`;

      window.history.replaceState(null, null, newUrl);
    } catch (error) {
      console.error("Error fetching mentors data:", error);
    }
  };

export default resultSlice.reducer;
