import axios from "axios";
import { API_URL } from "../../config";

export const getMentorDetails = (email) => {
  return axios.get(`${API_URL}/mentors/get/${email}`); // Replace with your actual API endpoint for fetching mentor details
};

export const updateMentorDetails = (mentorData) => {
  return axios.put("/api/mentor", mentorData); // Replace with your actual API endpoint for updating mentor details
};
