import { createContext, ReactNode, useState } from 'react';
import { getCookie } from 'cookies-next';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<any>(!!getCookie('nest-be') || null);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
