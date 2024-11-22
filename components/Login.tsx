"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

interface cookieData {
  user_id: number;
  email: string;
  username: string;
  token: string;
}

const Login = () => {
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formType === "login") {
      // send login request with email and password, if  successful, get a cookie from the server and create a session with it
      const response = axios.post("http://localhost/hacker-back/signIn", {
        email,
        password,
      });

      // if successful, create a session with the cookie
      const val = await response;

      if (val.data.status === "success") {
        // create a session with the cookie
        const cookie: cookieData = val.data.data;
        document.cookie = `session=${cookie.token}, user_id=${cookie.user_id}, email=${cookie.email}, username=${cookie.username}`;
        // redirect to /emotion-tracker
        console.log("redirecting to /emotion-tracker");

        redirect("/emotion-tracker");
      } else {
        setError(val.data.message);
      }
    } else {
      const response = axios.post("http://localhost/hacker-back/signUp", {
        username: username,
        email: email,
        password: password,
        role: userType,
      });

      const val = await response;
      // console.log(val);
      if (val.data.status === "success") {
        // create a session with the cookie
        const cookie: cookieData = val.data.data;
        document.cookie = `session=${cookie.token}, user_id=${cookie.user_id}, email=${cookie.email}, username=${cookie.username}`;
        // redirect to /emotion-tracker
        console.log("redirecting to /emotion-tracker");
        redirect("/emotion-tracker");
      } else {
        setError(val.data.message);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg md:w-96 w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {formType === "login" ? "Log in" : "Sign up"}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
          {/* Display error */}
          <AnimatePresence>
            {formType === "signup" && (
              <motion.div
                key="username-field" // Unique key for the username field
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username:
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:text-gray-500"
            placeholder="Enter your password"
          />
          <label
            htmlFor="userType"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Type d'utilisateur:
          </label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:text-gray-500"
          >
            <option value="" className="text-gray-700">
              -- Sélectionnez un type --
            </option>
            <option value="utilisateur" className="text-gray-700">
              Simple utilisateur
            </option>
            <option value="securite" className="text-gray-700">
              Service de sécurité
            </option>
            <option value="sante" className="text-gray-700">
              Service de santé
            </option>
          </select>
          <div className="flex justify-between mt-6 gap-2">
            <button
              type="button"
              onClick={() => setFormType("login")}
              className={`w-1/2 p-2 rounded-md relative ${
                formType === "login"
                  ? " text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {formType === "login" && (
                <motion.div
                  layoutId="login"
                  className="bg-indigo-700 absolute inset-0 rounded-md z-10"
                />
              )}
              <span className="relative z-10">Log in</span>
            </button>
            <button
              type="button"
              onClick={() => setFormType("signup")}
              className={`w-1/2 p-2 rounded-md relative ${
                formType === "signup"
                  ? " text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {formType === "signup" && (
                <motion.div
                  layoutId="signup"
                  className="bg-indigo-700 absolute inset-0 rounded-md"
                />
              )}
              <span className="relative z-10">Signup</span>
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition duration-200"
          >
            {formType === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
