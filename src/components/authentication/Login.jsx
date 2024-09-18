import React, { useState } from "react";
import bgImage from "../../images/bg/backimg.jpg";
import bg from "../../images/bg/Screenshot 2024-09-18 132734.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  loggedIn,
  setLoggedIn,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((showPwd) => !showPwd);
  };

  const handleLogin = () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    } else if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    // Email Validation check
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.match(emailRegex)) {
      toast.error("Invalid email format. Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Password complexity validation: Special character check
    const specialCharRegex = /[@$!%*#?&]/;
    if (!specialCharRegex.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    }

    // Password complexity validation: Number check
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }

    setLoggedIn(true);
    const userInfo = { email, password };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setEmail(email);
    setPassword("");
    toast.success("Login Successful!");
    navigate("/");
  };

  return (
    <div
      className="h-screen bg-cover bg-center dark:bg-gray-900"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl  rounded-lg lg:flex lg:items-center lg:justify-between">
        <div className="w-full lg:w-1/2 bg-purple-900 dark:bg-gray-800 p-8 rounded-lg lg:rounded-none lg:rounded-r-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white dark:bg-gray-600 rounded-full p-2 mb-2 flex items-center justify-center">
                <i className="fa-solid fa-lock text-purple-900 dark:text-white text-3xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-white dark:text-gray-200">
                Log In
              </h1>
            </div>

            <form className="w-full max-w-md space-y-4">
              <div className="px-4">
                <label
                  htmlFor="email"
                  className="block text-white dark:text-gray-200 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="px-4 relative">
                <label
                  htmlFor="password"
                  className="block text-white dark:text-gray-200 mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 mt-7 mr-4 flex items-center text-gray-400 dark:text-gray-200"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } text-gray-400 dark:text-gray-200 text-xl`}
                  ></i>
                </button>
              </div>
              <div className="px-4">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-yellow-500 dark:bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
