import { createContext, useState, Dispatch } from 'react';

type ContextType = {
  isNavigationOpen: boolean;
  setNavigationOpen: Dispatch<(prevState: boolean) => boolean>;
};

// @ts-ignore
export const GlobalContext = createContext<ContextType>();

const { Provider } = GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [isNavigationOpen, setNavigationOpen] = useState(false);

  const providerValue = {
    isNavigationOpen,
    setNavigationOpen,
  };

  return <Provider value={providerValue}>{children}</Provider>;
};
