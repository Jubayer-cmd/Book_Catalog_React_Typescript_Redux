import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { signin } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

// Define the type for the form data
interface SignInData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      console.log(data);
      const res = await dispatch(signin(data));
      console.log(res);
      if (res.payload.success) {
        navigate("/home");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-md mx-auto" style={{ height: "100vh" }}>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-violet-500">
            Sign In to Book House
          </h2>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
          </div>
          {error && <div className="text-red-500 my-2">{error}</div>}
          <div className="flex items-center justify-between">
            {/* Use Diazy UI Spinner component for loading indicator */}
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-dots loading-md"></span> // Display loading indicator
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <p className="mt-2">
            New to Book-House? SignUp to continue{" "}
            <Link className="text-blue-500" to={"/signup"}>
              SignUp
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
