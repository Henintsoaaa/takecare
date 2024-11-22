"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ThumbsUp, Heart, PartyPopper, Lightbulb } from 'lucide-react';
import { PostReaction } from '@/types/forum';

interface PostReactionsProps {
  reactions: PostReaction[];
  onReact: (type: PostReaction['type']) => void;
  currentUserId: number;
}

const reactionIcons = {
  like: ThumbsUp,
  heart: Heart,
  celebrate: PartyPopper,
  insightful: Lightbulb,
};

const reactionLabels = {
  like: 'Like',
  heart: 'Love',
  celebrate: 'Celebrate',
  insightful: 'Insightful',
};

export function PostReactions({ reactions, onReact, currentUserId }: PostReactionsProps) {
  const [showAll, setShowAll] = useState(false);

  const getReactionCount = (type: PostReaction['type']) => {
    return reactions.filter(r => r.type === type).length;
  };

  const hasReacted = (type: PostReaction['type']) => {
    return reactions.some(r => r.type === type && r.userId === currentUserId);
  };

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(reactionIcons) as PostReaction['type'][]).map((type) => {
        const Icon = reactionIcons[type];
        const count = getReactionCount(type);
        const reacted = hasReacted(type);

        return (
          <Tooltip key={type}>
            <TooltipTrigger asChild>
              <Button
                variant={reacted ? "secondary" : "ghost"}
                size="sm"
                className={`flex items-center gap-1 ${
                  reacted ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => onReact(type)}
              >
                <Icon className="h-4 w-4" />
                {count > 0 && <span className="text-xs">{count}</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{reactionLabels[type]}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}