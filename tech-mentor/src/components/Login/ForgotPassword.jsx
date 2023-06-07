import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Login.css";
import { handleResetPasswordrequest } from "./AuthServices";
import Loading from "../Layout/Loading/Loading";

export default function ForgotPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get token and email from query
  const token = queryParams.get("token");
  const email = queryParams.get("email");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const credentials = { email: email, token: token, newPassword: password };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      // Send a POST request to the backend API endpoint
      setLoading(true);

      const response = await handleResetPasswordrequest(credentials);

      setLoading(false);
      setSuccessMessage(response.data.message);

      console.log("Before navigate");
      navigate("/login", {
        state: { successMessage: "Password reset successful!" },
      });
      console.log("After navigate");
    } catch (error) {
      toast.error(error.response.data.message);
      setSuccessMessage("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className="passwordcontainer" id="container">
          <div className="form-container passwordsign-in-container">
            <form className="formmail" onSubmit={handleResetPassword}>
              <h1 className="h1mail">Forgot Password</h1>
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                onChange={handlePasswordChange}
              />
              <input
                className="input"
                type="password"
                placeholder="Confirm password"
                required
                onChange={handleConfirmPasswordChange}
              />
              {passwordError && <p className="error">{passwordError}</p>}
              <Link className="a" to={"/login"}>
                Go back to login
              </Link>
              <button className="button" type="submit">
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
