"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";

interface cookieData {
  user_id: number;
  email: string;
  username: string;
  token: string;
}

const empoweringQuotes = [
  "Embrace your power and potential.",
  "You are capable of amazing things.",
  "Your voice matters in tech and beyond.",
  "Believe in yourself and you will be unstoppable.",
  "Every day is a chance to make a difference.",
];

const Login = () => {
  const [quote, setQuote] = useState("");
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const randomQuote =
      empoweringQuotes[Math.floor(Math.random() * empoweringQuotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formType === "login") {
      // send login request with email and password, if  successful, get a cookie from the server and create a session with it
      const endPoint = `${process.env.NEXT_PUBLIC_IP_KEY}/signIn`;
      console.log(endPoint);

      const response = axios.post(endPoint, {
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
      const response = axios.post(`${process.env.NEXT_PUBLIC_IP_KEY}/signUp`, {
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
        // log the session cookie
        console.log(document.cookie);
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
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-purple-400"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Tech'her</h2>
          <p className="text-white text-xl italic">&quot;{quote}&quot;</p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg md:w-96 w-80"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-purple-600 mb-8">
            Bienvenue sur Tech'her
          </h1>
          <div className="flex justify-between mt-6 gap-2 bg-gray-100 p-1 rounded-full">
            <button
              type="button"
              onClick={() => setFormType("login")}
              className={`w-1/2 p-2 rounded-full relative ${
                formType === "login"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600"
              }`}
            >
              <span className="relative z-10">Log in</span>
            </button>
            <button
              type="button"
              onClick={() => setFormType("signup")}
              className={`w-1/2 p-2 rounded-full relative ${
                formType === "signup"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600"
              }`}
            >
              <span className="relative z-10">Signup</span>
            </button>
          </div>
          {error && (
            <p className="text-red-500 mb-4" role="alert">
              {error}
            </p>
          )}
          <AnimatePresence>
            {formType === "signup" && (
              <motion.div
                key="username-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mt-4"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
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
          <button
            type="submit"
            className="mt-6 w-full p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 shadow-md"
          >
            {formType === "login" ? "Log in" : "Sign up"}
          </button>
        </motion.form>
        <div className="mt-8 flex justify-center space-x-4">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Partner Logo 1"
            width={40}
            height={40}
            className="rounded-full"
          />
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Partner Logo 2"
            width={40}
            height={40}
            className="rounded-full"
          />
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Partner Logo 3"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
