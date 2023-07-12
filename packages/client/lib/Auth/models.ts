export type Login = {
  email: string;
  password: string;
};

export type ResponseLogin = {
  user: {
    token: string;
  };
};

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
