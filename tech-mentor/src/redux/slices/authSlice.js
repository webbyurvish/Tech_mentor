import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { CometChat } from "@cometchat-pro/chat";

// // Create an instance of axios with interceptor
// const axiosInstance = createAxiosInstance();

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response if needed
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// async thunk for login
export const loginUser = createAsyncThunk(
  "loginuser",
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/account/login", credentials);
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// async thunk for sign up
export const signupUser = createAsyncThunk(
  "signupUser",
  async ({ userData, navigate }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("imagefile", userData.image);
    try {
      const response = await axiosInstance.post("account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/account/changepassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  error: null,
  loading: false,
  user: null,
};

const token =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

//  if token is exist then decode it and store data in user
if (token) {
  const decodedToken = jwtDecode(token);
  initialState.user = decodedToken;
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
        toast.success("login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
        toast.success("signup successful");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("password changed successfully");
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export const {
  setCurrentPage,
  setSelectedStars,
  setOldPassword,
  setNewPassword,
  logout,
} = dataSlice.actions;

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

export default dataSlice.reducer;
