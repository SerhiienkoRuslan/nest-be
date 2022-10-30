export interface PostData {
  id: number,
  title: string,
  content?: string,
  published?: boolean,
  authorId?: number
}

export interface PostRO {
  post: PostData;
}
