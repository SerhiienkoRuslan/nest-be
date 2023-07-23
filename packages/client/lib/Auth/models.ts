export type Login = {
  email: string;
  password: string;
};

export type ResponseLogin = {
  user: User
};

export type ResponseCurrent = {
  user: User
};

// need to change
export type Post = {
  id: string;
  title: string;
  description: string
}

export type User = {
  "id": number;
  "email":string;
  "username": string;
  "bio": string | null;
  "avatar": string | null;
  "token": string;
  // "role": "USER",
  // "validEmail": true,
  "posts": Post[]
}

export type Register = {};

export type ResponseRegister = {
  message: string;
};

export type RegisterProfile = {};

export type ForgotPassword = {
  email: string;
};

export type ResponseForgotPassword = {
  message: string;
};

export type ChangePassword = {
  prev_password: string;
  new_password: string;
};

export type ResponseChangePassword = {
  message: string;
};
