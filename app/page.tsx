"use client";

import React, { useState, useEffect } from "react";
import Terminale from "@/components/Terminale";
import LandingPage from "@/components/LandingPage";

const Welcome = () => {
  const isFirstTime = localStorage.getItem("isFirstTime"); // true | false | logout
  // if it's the first time or logout, show the terminal
  const [isLoading, setLoading] = useState(isFirstTime !== "false");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("isFirstTime", "false");
    }, 8000);
  });
  return (
    <>
      {isLoading && <Terminale />}
      {!isLoading && <LandingPage />}
    </>
  );
};

export default Welcome;
