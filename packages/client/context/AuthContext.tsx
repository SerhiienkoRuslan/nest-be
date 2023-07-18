'use client';
import {fetchCurrent} from "@/lib/Auth/fetchCurrent";
import {User} from "@/lib/Auth/models";
import {createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react';
import {getCookie, setCookie, deleteCookie} from 'cookies-next';
import type {CookieValueTypes} from 'cookies-next';

interface IAuthContext {
  user: User | null;
  token: CookieValueTypes;
  isLogIn: boolean;
  logIn: Dispatch<SetStateAction<User>>;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLogIn: false,
  user: null,
  token: null,
  logIn: () => {},
  logOut: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenData] = useState<CookieValueTypes>(null);


  const setToken = useCallback((tokenData) => {
    setTokenData(tokenData);

    if (tokenData) {
      setCookie("token", tokenData);
    } else {
      deleteCookie("token");
    }
  }, []);

  const logIn = (user: User)=> {
    setUser(user)
    setToken(user.token)
    setIsLogIn(true)
  }


  const logOut = useCallback(() => {
    setUser(null);
    setIsLogIn(false)
    setToken(null);
  }, [setToken, setIsLogIn, setUser]);

  const loadData = useCallback(async () => {
    const tokenData = getCookie("token");
    setTokenData(tokenData);

    try {
      if (tokenData) {
        const { user } = await fetchCurrent()
        setIsLogIn(true)
        setUser(user)
      }
    } catch {
      setIsLogIn(false)
      setToken(null);
    }
  }, [setToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLogIn,
      user,
      token,
      logIn,
      logOut,
    }),
    [isLogIn, user, token, setToken, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
