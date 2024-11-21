"use client"; // Indicate that the code is client-side

import { useState } from "react";
import { useAuth } from "@/components/Login"; // Adjust the import path accordingly
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const { login, signup } = useAuth(); // Use the custom hook to get the methods
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // State for the username
  const [error, setError] = useState(null); // State for error
  const [userType, setUserType] = useState("");

  interface AuthContextType {
    login: (email: string, password: string, userType: string) => Promise<void>;
    signup: (
      username: string,
      email: string,
      password: string,
      userType: string
    ) => Promise<void>;
  }

  interface FormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error

    try {
      if (formType === "login") {
        await login(email, password, userType);
      } else {
        await signup(username, email, password, userType); // Include username during signup
      }
    } catch (err: any) {
      setError(err.message); // Set error if an exception is thrown
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
}
