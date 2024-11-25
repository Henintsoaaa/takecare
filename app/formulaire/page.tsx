"use client";
import Plainte from "@/components/Plainte";
import { redirect } from "next/navigation";

const Page = () => {
  let user_id: string | undefined;

  if (!document.cookie) {
    // Redirect to login page if user is not logged in
    redirect("/login");
  } else {
    user_id = document.cookie.split(",")[1].split("=")[1];
  }
  return (
    <div>
      <Plainte userId={user_id} />
    </div>
  );
};

export default Page;
