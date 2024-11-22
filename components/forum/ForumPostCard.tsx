"use client";

import { useState } from 'react';
import { ForumPost, ForumUser } from '@/types/forum';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PostReactions } from './PostReactions';
import { CommentSection } from './CommentSection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ForumPostCardProps {
  post: ForumPost;
}

const currentUser: ForumUser = {
  id: 1,
  name: 'Current User',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
  role: 'user',
};

export function ForumPostCard({ post }: ForumPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReaction = (type: 'like' | 'heart' | 'celebrate' | 'insightful') => {
    // Handle reaction logic here
    console.log(`Reacted with ${type}`);
  };

  const handleComment = (content: string, parentId?: number) => {
    // Handle comment logic here
    console.log(`New comment: ${content}`, parentId ? `Reply to: ${parentId}` : '');
  };

  const handleCommentReaction = (commentId: number, type: 'like' | 'heart') => {
    // Handle comment reaction logic here
    console.log(`Reacted to comment ${commentId} with ${type}`);
  };

  return (
    <>
      <Card 
        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
              alt="Author"
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {post.title}
              </h3>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {post.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <PostReactions
                  reactions={post.reactions}
                  onReact={handleReaction}
                  currentUserId={currentUser.id}
                />
                <div className="flex items-center gap-1 text-gray-500">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{post.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-4 -mr-4">
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p>{post.content}</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <PostReactions
                reactions={post.reactions}
                onReact={handleReaction}
                currentUserId={currentUser.id}
              />
            </div>
            <CommentSection
              comments={post.comments}
              currentUser={currentUser}
              onAddComment={handleComment}
              onReactToComment={handleCommentReaction}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}