import React, { useContext, useState } from "react";
import AuthLayout from "../../Component/layout/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Component/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/Axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/usercontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;
      updateUser(response.data);

      if (token) {
        localStorage.setItem("token", token);
      }

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-black text-center">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-600 mt-2 mb-6 text-center">
            Please enter your details to login
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Jhone@gmail.com"
            />

            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
            />

            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-2 rounded-lg"
            >
              LOGIN
            </button>

            <p className="text-sm text-slate-700 mt-3 text-center">
              Don&apos;t have an account?{" "}
              <Link
                className="font-medium text-primary underline"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
