"use client";

import { useState } from 'react';
import { ForumComment, ForumUser } from '@/types/forum';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { CommentReactions } from './CommentReactions';
import { MessageSquare, Reply } from 'lucide-react';

interface CommentSectionProps {
  comments: ForumComment[];
  currentUser: ForumUser;
  onAddComment: (content: string, parentId?: number) => void;
  onReactToComment: (commentId: number, type: 'like' | 'heart') => void;
}

export function CommentSection({ comments, currentUser, onAddComment, onReactToComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return;
    onAddComment(replyContent, parentId);
    setReplyContent('');
    setReplyingTo(null);
  };

  const CommentComponent = ({ comment, level = 0 }: { comment: ForumComment; level?: number }) => (
    <div className={`${level > 0 ? 'ml-8' : ''} mb-4`}>
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            alt="User avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">User Name</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <CommentReactions
              reactions={comment.reactions}
              onReact={(type) => onReactToComment(comment.id, type)}
              currentUserId={currentUser.id}
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500"
              onClick={() => setReplyingTo(comment.id)}
            >
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>
          {replyingTo === comment.id && (
            <div className="mt-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[100px] mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentComponent key={reply.id} comment={reply} level={level + 1} />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Comments</h3>
      </div>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="min-h-[100px] mb-2"
        />
        <div className="flex justify-end">
          <Button type="submit">Post Comment</Button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}