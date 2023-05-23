import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config";
import axios from "axios";
import { getMentorDetails } from "../APIs/mentorApi";

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
    // Make API call to update mentor details in the database
    const response = await axios.put(`${API_URL}/mentors/update`, mentorData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response1 = await getMentorDetails(mentorData.email);
    dispatch(setMentorDetails(response1.data));
  } catch (error) {
    console.error(error);
  }
};

export default mentorSlice.reducer;
