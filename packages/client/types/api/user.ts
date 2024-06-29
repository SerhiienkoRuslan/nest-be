import { CreatePostResponseAPI } from '@/types/api/posts';

export type User = {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  token: string;
  role: string;
  validEmail: boolean;
  posts: CreatePostResponseAPI[];
};
