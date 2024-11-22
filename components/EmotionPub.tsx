"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { Card, CardContent } from "./ui/card"; // Assuming you have a Card component
import { FaComment, FaShareAlt, FaPaperPlane } from "react-icons/fa"; // Import icons

interface Post {
  entry_id: number;
  username: string;
  notes: string;
  created_at: string;
  isAnonyme: number;
}

const EmotionShare = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to hold the posts
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [showCommentInput, setShowCommentInput] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/Hack4Her/posts`
        );
        setPosts(response.data.data as Post[]);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCommentChange = (entryId: number, value: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [entryId]: value,
    }));
  };

  const handleShare = (entryId: number) => {
    console.log(`Shared post with ID: ${entryId}`);
  };

  const handleCommentSubmit = (entryId: number) => {
    console.log(`Comment on post ${entryId}: ${comments[entryId]}`);
    setComments((prevComments) => ({
      ...prevComments,
      [entryId]: "",
    }));
    setShowCommentInput((prev) => ({
      ...prev,
      [entryId]: false,
    }));
  };

  const toggleCommentInput = (entryId: number) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [entryId]: !prev[entryId],
    }));
  };

  return (
    <div className="p-5 w-3xl flex flex-col gap-4 z-0">
      {loading && (
        <p className="text-center text-lg text-gray-600">Loading posts...</p>
      )}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {posts.map((post) => (
        <Card
          key={post.entry_id}
          className="bg-white border border-gray-300 rounded-lg shadow-lg z-0"
        >
          <CardContent className="p-4">
            <div>
              {post.isAnonyme !== 1 ? (
                <span className="font-bold text-xl text-indigo-600">
                  {post.username}
                </span>
              ) : (
                <span className="font-bold text-xl text-indigo-600">
                  Anonymous
                </span>
              )}
              <p className="mt-2 text-gray-800">{post.notes}</p>
              <small className="text-gray-500">
                {new Date(post.created_at).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </div>
            <div className="flex items-center mt-4 justify-between">
              <div className="flex">
                <FaComment
                  className="text-indigo-600 cursor-pointer hover:text-indigo-800 transition duration-200"
                  onClick={() => toggleCommentInput(post.entry_id)}
                />
                <span
                  className="ml-2 text-gray-700 cursor-pointer"
                  onClick={() => toggleCommentInput(post.entry_id)}
                >
                  Add Comment
                </span>
              </div>
              <FaShareAlt
                className="ml-4 text-indigo-600 cursor-pointer hover:text-indigo-800 transition duration-200"
                onClick={() => handleShare(post.entry_id)}
              />
            </div>
            {showCommentInput[post.entry_id] && (
              <div className="mt-2 flex items-center">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Add a comment..."
                  value={comments[post.entry_id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post.entry_id, e.target.value)
                  }
                />
                <FaPaperPlane
                  className="ml-2 text-indigo-600 cursor-pointer hover:text-indigo-800 transition duration-200"
                  onClick={() => handleCommentSubmit(post.entry_id)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmotionShare;
