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
import { redirect } from "next/navigation"; // Keep this for server-side context
import { Search } from "lucide-react";

interface Comment {
  user_id: number;
  content: string;
  created_at: string;
  username: string; // Add username to display who commented
}

interface Post {
  entry_id: number;
  user_id: number;
  username: string;
  notes: string;
  created_at: string;
  isAnonyme: number;
  comments: Comment[]; // Add comments structure
  reaction: {
    isLiked: boolean;
  };
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  let user_id: string | undefined;

  if (!document.cookie) {
    // Redirect to login page if user is not logged in
    redirect("/login");
  } else {
    user_id = document.cookie.split(",")[1].split("=")[1];
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_IP_KEY}/posts?user_id=${user_id}`
      );
      // Assuming the response includes comments for each post
      setPosts(response.data.data.reverse() as Post[]);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts
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

  const handleCommentSubmit = async (entryId: number) => {
    const commentText = comments[entryId];

    if (!commentText) {
      console.error("Comment cannot be empty.");
      return; // Prevent submitting an empty comment
    }

    console.log(`Comment on post ${entryId}: ${commentText}`);

    // Prepare the data to send to the comment creation endpoint
    const commentData = {
      entry_id: entryId,
      user_id: user_id, // The user who is commenting
      content: commentText, // The actual comment text
    };

    try {
      // Send the comment to the backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_KEY}/comment/create`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response returns the newly created comment
      const newComment: Comment = {
        user_id: Number(user_id),
        content: commentText,
        created_at: new Date().toISOString(), // Use current date for local display
        username: "Your Username", // Replace with actual username if available
      };

      // Update the post with the new comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.entry_id === entryId
            ? { ...post, comments: [...post.comments, newComment] } // Append the new comment
            : post
        )
      );

      // Clear the comment input and hide the input area
      setComments((prevComments) => ({
        ...prevComments,
        [entryId]: "",
      }));
      setShowCommentInput((prev) => ({
        ...prev,
        [entryId]: false,
      }));
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const toggleCommentInput = (entryId: number) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [entryId]: !prev[entryId],
    }));
  };

  const handleReaction = async (entryId: number) => {
    const currentLikeState = likes[entryId];

    setLikes((prevLikes) => ({
      ...prevLikes,
      [entryId]: !currentLikeState,
    }));

    const reactionData = {
      entry_id: entryId,
      user_id: user_id,
      reaction_type: currentLikeState ? "dislike" : "like",
    };

    console.log("Sending reaction data:", reactionData);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_IP_KEY}/react`,
        reactionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Sending notification to post owner
      const notificationData = {
        entry_id: entryId,
        user_id: user_id, // The user who reacted
        notification_type: currentLikeState ? "dislike" : "like", // Type of notification
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_IP_KEY}/notification/create`,
        notificationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchPosts(); // Refetch posts to update the like state
    } catch (error) {
      console.error("Error updating reaction:", error);
      setLikes((prevLikes) => ({
        ...prevLikes,
        [entryId]: currentLikeState,
      }));
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUsernameClick = (userId: number) => {
    redirect(`/user/${userId}`); // Use redirect to navigate to user profile
  };

  return (
    <div className="p-5 w-full flex flex-col gap-4">
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
              <span
                className="font-bold text-xl text-indigo-600 cursor-pointer"
                onClick={() => handleUsernameClick(post.user_id)} // Add click handler
              >
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
                  {post.reaction.isLiked ? (
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
                    className="text-indigo-600 cursor-pointer hover:text-indigo- 800 transition duration-200"
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
            {post.comments &&
              post.comments.map((comment) => (
                <div key={comment.created_at} className="mt-2">
                  <span className="font-bold text-gray-800">
                    {comment.username}
                  </span>
                  <p className="text-gray-600">{comment.content}</p>
                  <small className="text-gray-500">
                    {new Date(comment.created_at).toLocaleString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmotionShare;
