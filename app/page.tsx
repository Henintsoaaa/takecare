"use client";

import React, { useState, useEffect } from "react";
import Terminale from "@/components/Terminale";
import LandingPage from "@/components/LandingPage";

const Welcome = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 8000);
  });

  return (
    <>
      {isLoading && <Terminale />}
      {!isLoading && <LandingPage />}
    </>
  );
};

export default Welcome;
