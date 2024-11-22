"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ForumCategory } from '@/types/forum';
import { MessageCircle, Zap, Code, Lightbulb, Coffee, Heart } from 'lucide-react';

const categories: ForumCategory[] = [
  {
    id: 1,
    name: 'General Discussion',
    description: 'Open discussions about any topic',
    postCount: 156,
    icon: 'MessageCircle'
  },
  {
    id: 2,
    name: 'Tech Talk',
    description: 'Discussion about technology',
    postCount: 89,
    icon: 'Zap'
  },
  {
    id: 3,
    name: 'Programming',
    description: 'Code-related discussions',
    postCount: 234,
    icon: 'Code'
  },
  {
    id: 4,
    name: 'Ideas & Feedback',
    description: 'Share your thoughts',
    postCount: 67,
    icon: 'Lightbulb'
  },
  {
    id: 5,
    name: 'Coffee Break',
    description: 'Casual conversations',
    postCount: 112,
    icon: 'Coffee'
  },
  {
    id: 6,
    name: 'Community',
    description: 'Community events and news',
    postCount: 45,
    icon: 'Heart'
  }
];

const iconMap = {
  MessageCircle,
  Zap,
  Code,
  Lightbulb,
  Coffee,
  Heart
};

interface ForumSidebarProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export function ForumSidebar({ selectedCategory, onSelectCategory }: ForumSidebarProps) {
  return (
    <div className="w-64 border-r dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b dark:border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectCategory(null)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          All Categories
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectCategory(category.id)}
              >
                <Icon className="h-5 w-5 mr-2" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-500">{category.postCount} posts</span>
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}