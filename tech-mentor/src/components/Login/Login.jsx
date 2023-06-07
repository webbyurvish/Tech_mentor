import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Login.css";
import { CometChat } from "@cometchat-pro/chat";

import { extractUsername } from "../Mentor/MentorServices";
import { loginUser, signupUser } from "../../redux/slices/authSlice";
import Loading from "../Layout/Loading/Loading";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const cometchatApiUrl = process.env.REACT_APP_COMETCHAT_URL;

  const { loading, user } = useSelector((state) => state.auth);

  const [username, setName] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const toggleRightPanel = () => {
    setRightPanelActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) {
      const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;

      // extracting user id for cometchat from email
      const uid = extractUsername(user.email);
      const name = user.name;
      const role = "user";

      // check weather the user is exist in cometchat or not
      CometChat.getUser(uid)
        .then(
          (existingUser) => {
            console.log("User already exists:", existingUser);
            // if User already exists, proceed with login
            loginCometChatUser(uid, authKey);
          },
          (error) => {
            console.log("User does not exist:", error);
            // User does not exist, create a new user
            const options = {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                apikey: authKey,
              },
              body: JSON.stringify({
                uid,
                name,
                role,
                withAuthToken: false,
              }),
            };

            fetch(`${cometchatApiUrl}`, options)
              .then((response) => response.json())
              .then((response) => {
                console.log("User created:", response);
                // Proceed with login
                loginCometChatUser(uid, authKey);
              })
              .catch((error) => {
                console.log("Error creating user:", error);
              });
          }
        )
        .catch((error) => {
          console.log("Error checking user:", error);
        });
    }
  }, [user]);

  function loginCometChatUser(uid, authKey) {
    CometChat.login(uid, authKey)
      .then((user) => {
        console.log("Login Successful:", { user });
        navigate("/"); // Redirect to the desired page after successful login
      })
      .catch((error) => {
        console.log("Login failed with exception:", { error });
        // Handle login error
      });
  }

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    dispatch(loginUser({ credentials, navigate }));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const userData = {
      name: username,
      email: email,
      password: password,
      image: image,
    };
    dispatch(signupUser({ userData, navigate }));
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form className="form" onSubmit={handleSignup}>
              <h1 className="h1">Create Account</h1>
              <input
                className="input"
                type="text"
                placeholder="Name"
                required
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
              />
              {password.length > 0 && password.length < 6 && (
                <p className="error">
                  Password must be at least 6 characters long
                </p>
              )}
              <input
                className="input"
                type="file"
                id="img"
                name="img"
                accept="image/*"
                required
                onChange={(event) => setImage(event.target.files[0])}
              />
              <button className="button" type="submit">
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="form" onSubmit={handleLogin}>
              <h1 className="h1">Sign in</h1>
              <input
                className="input"
                type="email"
                placeholder="Email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <Link to={"/mailrequest"} className="a">
                Forgot your password?
              </Link>
              <button className="button" type="submit">
                Sign In
              </button>
              <Link className="a" to={"/"}>
                Go back
              </Link>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1">Welcome Back!</h1>
                <p className="p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="button ghost"
                  id="signIn"
                  onClick={toggleRightPanel}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1">Hello !</h1>
                <p className="p">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="button ghost"
                  id="signUp"
                  onClick={toggleRightPanel}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}