import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import axios from "axios";
import { API_URL } from "../../config";
import { handleResetPasswordrequest } from "./AuthServices";

export default function ForgotPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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
      {!loading && (
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
          {/* <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button className="button ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p">
                Enter your personal details and start journey with us
              </p>
              <button className="button ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div> */}
        </div>
      )}
      {loading && <div className="sbl-circ-ripple"></div>}
    </div>
  );
}
