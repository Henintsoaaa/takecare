"use client";

import { useState } from 'react';
import { ForumSidebar } from './ForumSidebar';
import { ForumFeed } from './ForumFeed';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { NewPostDialog } from './NewPostDialog';

export function ForumLayout() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-[80vh] bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
      <div className="flex h-full">
        <ForumSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Discussion Forum
            </h1>
            <Button
              onClick={() => setShowNewPost(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Post
            </Button>
          </div>
          <ForumFeed selectedCategory={selectedCategory} />
        </div>
      </div>
      <NewPostDialog open={showNewPost} onOpenChange={setShowNewPost} />
    </div>
  );
}