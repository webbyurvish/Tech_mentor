import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config";
import axios from "axios";
import { getMentorDetails } from "../APIs/mentorApi";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    details: null,
  },
  reducers: {
    setMentorDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setMentorDetails, updateMentorDetailsSuccess } =
  mentorSlice.actions;

export const updateMentorDetails = (mentorData) => async (dispatch) => {
  try {
    await axiosInstance.put("/mentors/update", JSON.stringify(mentorData), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const response1 = await getMentorDetails(mentorData.email);
    dispatch(setMentorDetails(response1.data));
  } catch (error) {
    console.error(error);
  }
};

export default mentorSlice.reducer;
