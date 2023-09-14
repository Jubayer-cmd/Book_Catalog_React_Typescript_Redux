/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";

export interface signupData {
  name: string;
  email: string;
  password: string;
  role?: string;
  contactNo: string;
  address: string;
  profileImg: string;
}

export interface loginData {
  email: string;
  password: string;
}

const signup = async (data: signupData): Promise<any> => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/auth/signup`,
      data
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorResponse = "Email already exists";
      throw errorResponse;
    } else {
      throw { errorMessage: "Network error" };
    }
  }
};

const signin = async (data: loginData): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/signin",
      data
    );
    const token = response.data.data.token;
    Cookies.set("token", token);
    console.log(token);
    return response.data; // Return the full response, including data
  } catch (error: any) {
    // Handle the error and log the server's error response
    if (error.response) {
      const errorResponse = error.response.data;
      console.error("Server error response:", errorResponse);
      throw errorResponse; // Rethrow the error response to be captured in the rejected action
    } else {
      console.error("Network error:", error.message);
      throw { errorMessage: "Network error" }; // Rethrow a consistent error structure
    }
  }
};

const logout = async (): Promise<void> => {
  Cookies.remove("token"); // Remove the "token" cookie when logging out
};

export default {
  signup,
  signin,
  logout,
};
