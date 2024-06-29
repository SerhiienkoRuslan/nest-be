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
import { User } from '@/types/api/auth';

interface IAuthContext {
  user: User | null;
  isLogIn: boolean;
  logIn: Dispatch<SetStateAction<User>>;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLogIn: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
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

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLogIn,
      user,
      logIn,
      logOut,
    }),
    [isLogIn, user, logOut],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
