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
  isLoading: boolean;
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
  updateUser: async () => { },
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false)

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
    const token = getCookie('token');
    try {
      if (token) {
        const newUser = await updateUserData(userNewData, id);
        setUser(newUser);
        setIsloading(true)
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      (setIsloading(false))
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
      updateUser,
      isLoading,
    }),
    [isLogIn, user, logOut, updateUser, isLoading],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
