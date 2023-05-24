import axios from "axios";
import { API_URL } from "../../config";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/account/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  const { data } = response;

  // Extract the user object and the token from the response data
  const { token } = data;

  return {
    token,
  };
};

export const signup = async (userData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("imagefile", userData.image); // Assuming imageFile is the selected image file from an input field

  const response = await axios.post(`${API_URL}/account/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const { data } = response;

  const { token } = data;

  return {
    token,
  };
};
