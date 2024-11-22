export interface ForumPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  reactions: PostReaction[];
  comments: ForumComment[];
  tags: string[];
}

export interface ForumComment {
  id: number;
  postId: number;
  authorId: number;
  content: string;
  createdAt: Date;
  reactions: CommentReaction[];
  replies: ForumComment[];
}

export interface PostReaction {
  id: number;
  type: 'like' | 'heart' | 'celebrate' | 'insightful';
  userId: number;
}

export interface CommentReaction {
  id: number;
  type: 'like' | 'heart';
  userId: number;
}

export interface ForumCategory {
  id: number;
  name: string;
  description: string;
  postCount: number;
  icon: string;
}

export interface ForumUser {
  id: number;
  name: string;
  avatar: string;
  role: 'user' | 'moderator' | 'admin';
}