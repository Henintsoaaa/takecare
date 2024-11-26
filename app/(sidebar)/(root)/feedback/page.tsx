"use client";
import React, { useState } from "react";
import Evaluations from "@/components/UserEvaluation";

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Evaluations />
    </div>
  );
};

export default Page;
