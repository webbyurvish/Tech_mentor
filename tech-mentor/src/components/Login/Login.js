import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { CometChat } from "@cometchat-pro/chat";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    dispatch(loginUser(credentials));
  };

  if (user) {
    navigate("/");
  }

  const handleSignup = (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    console.log(userData);
    dispatch(signupUser(userData));
    if (user) {
      let authKey = "1ac07ca05aafc7ebf4eec044a895c5451eadf638";
      var uid = `user${Number(user.id)}`;
      var name = user.name;

      var user = new CometChat.User(uid);
      user.setName(name);
      CometChat.createUser(user, authKey).then(
        (user) => {
          console.log("user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  };

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="container" id="container">
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
        </div>
      </div>
    </div>
  );
}
