import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../validationSchemas/LoginSchema";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const initialValue = {
    email: "",
    password: "",
  };

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValue,
    validationSchema: LoginSchema,
    onSubmit: async (value, action) => {
      const res = await dispatch(loginUser(value));

      if (res?.payload?.success === true) {
        navigate("/dashboard");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">
            Welcome
          </h2>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={values.email}
            onChange={handleChange}
            name="email"
            
          />
          <p className="text-red-600 text-xs min-h-5 mt-1">
            {touched.email && errors?.email ? errors?.email : ""}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={values.password}
            onChange={handleChange}
            name="password"
            
          />
          <p className="text-red-600 text-xs min-h-5 mt-1">
            {touched.password && errors?.password ? errors?.password : ""}
          </p>
        </div>
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-bold shadow-md hover:from-blue-600 hover:to-blue-700 transition mb-2 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">Don't have an account? </span>
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
