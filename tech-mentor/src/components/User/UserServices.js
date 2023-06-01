import axios from "axios";
import { API_URL } from "../../config";

// send request to backend for password change
export const handleResetPasswordSubmitFunction = async (
  user,
  oldPassword,
  newPassword,
  successCallback,
  errorCallback,
  navigate
) => {
  const data = {
    email: user.email,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };

  try {
    const response = await axios.post(
      `${API_URL}/account/changepassword`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    successCallback(response.data.message);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login"); // Redirect to the login page
    } else {
      console.log(error.response.data.message);
      errorCallback(error.response.data.message);
    }
  }

  console.log(oldPassword, newPassword);
};
