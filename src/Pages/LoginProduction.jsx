import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginProduction = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/productionUser/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200 && response.data.success) {
        const { accessToken } = response.data.data;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          console.log("Login successful");
          window.location.href = "/WorkspaceProduction";
        } else {
          setAuthError("Token not provided");
        }
      } else {
        setAuthError("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setAuthError("Error logging in");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/Workspace";
    }
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto items-center">
          <div className="mb-7 mx-auto">
            <h1 className="text-3xl md:text-4xl text-center lg:text-5xl font-bold text-indigo-500">
              CG Management System
            </h1>
          </div>
          <div className="lg:w-2/5 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 py-12">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign In
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="full-name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <button
              onClick={handleLogin}
              className="text-white bg-indigo-500 border-0 py-2 px-8 w-full focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Sign In
            </button>
            {authError && (
              <p className="text-xs text-red-500 mt-3">{authError}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginProduction;
