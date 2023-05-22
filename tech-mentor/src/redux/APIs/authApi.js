import axios from "axios";
import { API_URL } from "../../config";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/account/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = response;

    // Extract the user object and the token from the response data
    const { token, user } = data;

    // Return the user object including the token
    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signup = async (userData) => {
  try {
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

    const { token, user } = data;

    // Extract the user object and the token from the response data
    // Return the user object including the token
    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error("Signup failed");
  }
};
