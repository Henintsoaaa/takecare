"use client";

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ThumbsUp, Heart } from 'lucide-react';
import { CommentReaction } from '@/types/forum';

interface CommentReactionsProps {
  reactions: CommentReaction[];
  onReact: (type: CommentReaction['type']) => void;
  currentUserId: number;
}

const reactionIcons = {
  like: ThumbsUp,
  heart: Heart,
};

const reactionLabels = {
  like: 'Like',
  heart: 'Love',
};

export function CommentReactions({ reactions, onReact, currentUserId }: CommentReactionsProps) {
  const getReactionCount = (type: CommentReaction['type']) => {
    return reactions.filter(r => r.type === type).length;
  };

  const hasReacted = (type: CommentReaction['type']) => {
    return reactions.some(r => r.type === type && r.userId === currentUserId);
  };

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(reactionIcons) as CommentReaction['type'][]).map((type) => {
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