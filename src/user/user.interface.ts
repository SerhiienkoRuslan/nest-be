export interface UserData {
  username: string;
  email: string;
  token?: string;
  avatar?: string;
}

export interface UserRO {
  user: UserData;
}
