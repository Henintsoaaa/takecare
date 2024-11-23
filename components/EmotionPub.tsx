"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import {
  FaComment,
  FaShareAlt,
  FaPaperPlane,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { Search } from "lucide-react";

interface Post {
  entry_id: number;
  username: string;
  notes: string;
  created_at: string;
  isAnonyme: number;
}

const EmotionShare = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [showCommentInput, setShowCommentInput] = useState<{
    [key: number]: boolean;
  }>({});
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/posts`
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

  const handleReaction = (entryId: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [entryId]: !prevLikes[entryId],
    }));
  };

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5 w-full flex flex-col gap-4">
      {/* Search Bar */}
      <div className="mb-4 flex gap-6 items-center flex-nowrap">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hidden md:block"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="text-indigo-600 w-10 h-10 " />
      </div>

      {loading && (
        <p className="text-center text-lg text-gray-600">Loading posts...</p>
      )}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {filteredPosts.map((post) => (
        <Card
          key={post.entry_id}
          className="bg-white border border-gray-300 rounded-lg shadow-md"
        >
          <CardContent className="p-4">
            <div>
              <span className="font-bold text-xl text-indigo-600">
                {post.isAnonyme !== 1 ? post.username : "Anonymous"}
              </span>
              <p className="mt-2 text-gray-800">{post.notes}</p>
              <small className="text-gray-500">
                {new Date(post.created_at).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </div>
            <div className="flex gap-2 items-center justify-between mt-4">
              <div className="flex gap-4">
                <div className="flex items-center">
                  {likes[post.entry_id] ? (
                    <FaHeart
                      className="text-red-600 cursor-pointer hover:text-red-800 transition duration-200"
                      onClick={() => handleReaction(post.entry_id)}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-gray-600 cursor-pointer hover:text-red-800 transition duration-200"
                      onClick={() => handleReaction(post.entry_id)}
                    />
                  )}
                </div>
                <div className="flex items-center">
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
              </div>
              <FaShareAlt
                className="ml-4 text-indigo-600 cursor-pointer hover:text-indigo-800 transition duration-200"
                onClick={() => handleShare(post.entry_id)}
              />
            </div>
            {showCommentInput[post.entry_id] && (
              <div className="mt-2 flex items-center">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
