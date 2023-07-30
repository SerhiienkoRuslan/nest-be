export type User = {
  email: string;
  password: string;
};

export type UserRole = 'Admin';

const users = {
  userAdmin: {
    email: 'admin@nestbe.com',
    password: 'admin@nestbe.com',
  },
};

export const credentials: Record<UserRole, User> = {
  Admin: users.userAdmin,
};

export default users;
