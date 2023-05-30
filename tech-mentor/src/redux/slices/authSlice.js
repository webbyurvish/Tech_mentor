import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../APIs/authApi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getMentorDetails } from "../APIs/mentorApi";
import { CometChat } from "@cometchat-pro/chat";

import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  mentor: null,
  loading: false,
  error: null,
  message: "",
};

const token =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

if (token) {
  const decodedToken = jwtDecode(token);
  initialState.user = decodedToken;
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = jwtDecode(action.payload.token);
      state.message = "login success";
      //   localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "login failed";
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = jwtDecode(action.payload.token);
      state.message = "signup success";
      localStorage.setItem("token", action.payload.token);
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "signup failure";
    },

    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { token } = await login(JSON.stringify(credentials));
    dispatch(loginSuccess({ token }));
  } catch (error) {
    if (error.response && error.response.data) {
      // Error response received from the backend
      dispatch(loginFailure(error.response.data));
      toast.error(error.response.data);
    } else {
      // Generic error message
      dispatch(loginFailure("An error occurred while logging in"));
      toast.error("An error occurred while logging in");
    }
    // dispatch(loginFailure(error.response?.data || error.message));
    // toast.error(error.response?.data || error.message);
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const { token } = await signup(userData);
    dispatch(signupSuccess({ token }));
    toast.success("Signup successful!");
  } catch (error) {
    if (error.response && error.response.data) {
      // Error response received from the backend
      dispatch(signupFailure(error.response.data.message));
      toast.error(error.response.data.message);
    } else {
      // Generic error message
      dispatch(signupFailure("An error occurred while signing in"));
      toast.error("An error occurred while signing in");
    }
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  CometChat.logout().then(
    () => {
      console.log("Logout completed successfully");
    },
    (error) => {
      console.log("Logout failed with exception:", { error });
    }
  );
};

export default authSlice.reducer;
