export interface UserData {
  username: string;
  email: string;
  token?: string;
  avatar?: string;
  id: number;
}

export interface UserRO {
  user: UserData;
}
