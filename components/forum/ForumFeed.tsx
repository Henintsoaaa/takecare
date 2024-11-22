"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { ForumPost } from '@/types/forum';
import { ForumPostCard } from './ForumPostCard';

const samplePosts: ForumPost[] = [
  {
    id: 1,
    title: "What's your favorite programming language and why?",
    content: "I'm curious to hear everyone's thoughts on their preferred programming language. What makes it special for you?",
    authorId: 1,
    createdAt: new Date(Date.now() - 3600000 * 2),
    updatedAt: new Date(Date.now() - 3600000 * 2),
    reactions: [
      { id: 1, type: 'like', userId: 2 },
      { id: 2, type: 'heart', userId: 3 },
      { id: 3, type: 'insightful', userId: 4 }
    ],
    comments: [
      {
        id: 1,
        postId: 1,
        authorId: 2,
        content: "I love Python for its simplicity and readability!",
        createdAt: new Date(Date.now() - 3000000),
        reactions: [
          { id: 1, type: 'like', userId: 1 }
        ],
        replies: []
      }
    ],
    tags: ['discussion', 'programming']
  },
  {
    id: 2,
    title: "Tips for improving code review process",
    content: "Looking for suggestions on how to make our code review process more efficient and effective.",
    authorId: 2,
    createdAt: new Date(Date.now() - 3600000 * 5),
    updatedAt: new Date(Date.now() - 3600000 * 5),
    reactions: [
      { id: 4, type: 'like', userId: 1 },
      { id: 5, type: 'celebrate', userId: 3 }
    ],
    comments: [],
    tags: ['best-practices', 'teamwork']
  },
  {
    id: 3,
    title: "Introducing our new community guidelines",
    content: "We've updated our community guidelines to ensure a better experience for everyone.",
    authorId: 3,
    createdAt: new Date(Date.now() - 3600000 * 8),
    updatedAt: new Date(Date.now() - 3600000 * 8),
    reactions: [
      { id: 6, type: 'like', userId: 1 },
      { id: 7, type: 'heart', userId: 2 }
    ],
    comments: [],
    tags: ['announcement', 'community']
  }
];

interface ForumFeedProps {
  selectedCategory: number | null;
}

export function ForumFeed({ selectedCategory }: ForumFeedProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {samplePosts.map((post) => (
          <ForumPostCard key={post.id} post={post} />
        ))}
      </div>
    </ScrollArea>
  );
}