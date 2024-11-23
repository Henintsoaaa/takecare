"use client";
import Plainte from "@/components/Plainte";

const Page = () => {
  // Get the user id from the user cookie
  const userId = document.cookie.split(",")[0].split("=")[1];
  return (
    <div>
      <Plainte userId={userId} />
    </div>
  );
};

export default Page;
