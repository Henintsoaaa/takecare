"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoodbyePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the landing page after 5 seconds
    const timer = setTimeout(() => {
      router.push("/"); // Adjust this path to your landing page route
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Goodbye!</h1>
      <p className="text-lg text-gray-600 mb-8">
        We're sorry to see you go. Thank you for being with us!
      </p>
      <p className="text-md text-gray-500">
        You will be redirected to the landing page shortly...
      </p>
      <div className="mt-6">
        <img
          src="/goodbye-illustration.svg" // Replace with your own illustration or image
          alt="Goodbye Illustration"
          className="w-64 h-auto"
        />
      </div>
    </div>
  );
};

export default GoodbyePage;
