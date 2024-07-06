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
import { User } from '@/types/api/user';

interface IAuthContext {
  user: User | null;
  isLogIn: boolean;
  logIn: Dispatch<SetStateAction<User>>;
  logOut: () => void;
  updateUser: (id: number, userNewData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  isLogIn: false,
  user: {
    avatar: null,
    bio: null,
    email: '',
    id: 0,
    posts: [],
    role: '',
    username: '',
    validEmail: false,
    token: '',
    phone: '',
    gender: '',
    birthday: new Date(),
    location: '',
    interests: ''
  },
  logIn: () => { },
  logOut: () => { },
  updateUser: async () => { },
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

        // await fetch1() // 10 
        // await fetch2() // 20
        // await fetch3() // 30
        // await fetch4() // 40
        // // 100

        // const [res1, res2, res3, res4] = await Promise.all([
        //   await fetch1() // 10
        //   await fetch2() // 20
        //   await fetch3() // 30
        //   await fetch4() // 40
        // ]) // 40

        setIsLogIn(true);
        setUser(user);
      }
    } catch {
      setIsLogIn(false);
      deleteCookie('token');
    }
  }, []);

  const updateUser = useCallback(async (id: number, userNewData: Partial<User>) => {
    const newUser = await updateUserData(id, userNewData);
    setUser(newUser);
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
    }),
    [isLogIn, user, logOut, updateUser],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
