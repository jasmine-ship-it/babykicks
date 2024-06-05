import { createContext, useState } from "react";

export const CountContext = createContext({
  currentCount: null,
  setCurrentCount: () => null,
});

export const CountProvider = ({ children }) => {
  const [currentCount, setCurrentCount] = useState(null);
  const value = { currentCount, setCurrentCount };
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};
