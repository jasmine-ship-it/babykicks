import { createContext, useState } from "react";

export const ProfileContext = createContext({
  currentProfile: null,
  setCurrentProfile: () => null,
});

export const ProfileProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState({
    name: "",
    email: "",
    displayPicture: "",
    history: [],
    // serverTimestamp: "",
  });
  const value = { currentProfile, setCurrentProfile };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
