import { User } from '@/types/api/user';

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponseAPI = {
  user: User;
};

export type CurrentUserResponseAPI = {
  user: User;
};

export type RegistrationBody = {
  username: string;
  email: string;
  password: string;
};

export type RegistrationResponseAPI = {
  message: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ForgotPasswordResponseAPI = {
  message: string;
};

export type ChangePasswordBody = {
  prev_password: string;
  new_password: string;
};

export type ChangePasswordResponseAPI = {
  message: string;
};
