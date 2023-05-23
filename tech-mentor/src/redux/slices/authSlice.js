import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../APIs/authApi";
import { logoutMentor } from "./mentorSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      typeof localStorage !== "undefined" ? localStorage.getItem("user") : null,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = "login success";
      localStorage.setItem("user", JSON.stringify(action.payload.user));
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
      state.user = action.payload.user;
      state.message = "signup success";
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);

      // state.user = action.payload.user;
      // localStorage.setItem('token', action.payload.token);
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
      localStorage.removeItem("user");
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
    const { token, user } = await login(JSON.stringify(credentials));
    console.log(token, user);
    dispatch(loginSuccess({ token, user }));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const { token, user } = await signup(userData);
    dispatch(signupSuccess({ token, user }));
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  //   dispatch(logoutMentor());
};

export default authSlice.reducer;
