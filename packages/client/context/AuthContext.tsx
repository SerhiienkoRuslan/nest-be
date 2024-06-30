'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { fetchCurrent } from '@/lib/Auth/fetchCurrent';
import { updateUserData } from '@/lib/Auth/updateUserData';
import { User } from '@/types/api/auth';

interface IAuthContext {
  user: User | null;
  isLogIn: boolean;
  logIn: Dispatch<SetStateAction<User>>;
  logOut: () => void;
  updateUser: (userNewData: Partial<User>, id: number) => Promise<User>;
}

export const AuthContext = createContext<IAuthContext>({
  isLogIn: false,
  user: {
    avatar: null,
    bio: null,
    email: '',
    id: null,
    posts: [],
    role: '',
    username: '',
    validEmail: false,
  },
  logIn: () => { },
  logOut: () => { },
  updateUser: async () => { throw new Error("updateUser not implemented"); }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const logIn = (user: User) => {
    setUser(user);
    setCookie('token', user.token);
    setIsLogIn(true);
  };

  const logOut = useCallback(() => {
    setUser(null);
    setIsLogIn(false);
    deleteCookie('token');
  }, [setIsLogIn, setUser]);

  const loadData = useCallback(async () => {
    const token = getCookie('token');

    try {
      if (token) {
        const { user } = await fetchCurrent();
        setIsLogIn(true);
        setUser(user);
      }
    } catch {
      setIsLogIn(false);
      deleteCookie('token');
    }
  }, []);

  const updateUser = useCallback(async (userNewData: Partial<User>, id: number) => {

    try {
      const newUser = await updateUserData(userNewData, id);
      setUser(newUser);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLogIn,
      user,
      logIn,
      logOut,
      updateUser
    }),
    [isLogIn, user, logOut, updateUser],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
