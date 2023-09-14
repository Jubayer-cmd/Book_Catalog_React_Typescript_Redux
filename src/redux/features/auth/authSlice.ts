/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authService, { loginData, signupData } from "./authService";

interface AuthState {
  data: {
    token: string | null;
  };
  message: string;
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: signupData) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (userData: loginData) => {
    try {
      const response = await authService.signin(userData);
      console.log("authslice", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return null;
});

const cookieValue = Cookies.get("token");

const initialState: AuthState = {
  data: { token: cookieValue || "" },
  message: "",
  isLoading: false,
  isError: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.data.token = action.payload.token;
        state.isError = false;
        state.error = "";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message as string;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.message = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.token = action.payload.data.token;
        state.isError = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data.token = null;
        state.error = action.error.message as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data.token = null;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.message = "";
      });
  },
});

export default authSlice.reducer;
