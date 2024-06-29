export type CreatePostResponseAPI = {
  id: string | number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
};

export type PostBody = {
  title: string;
  content: string;
  published: boolean;
};
