export interface UserData {
  username: string;
  email: string;
  token?: string;
  avatar?: string;
  password?: string;
  id: number;
}

export interface UserRO {
  user: UserData;
}
