import axios from "axios";
import { API_URL } from "../../config";

export const fetchRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/requests`);
    console.log(response);
    return response.data;
    // dispatch(setMentorDetails(response.data));
  } catch (error) {
    return error.response;
  }
};
