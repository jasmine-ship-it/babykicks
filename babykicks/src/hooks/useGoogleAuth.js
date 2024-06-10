import { ProfileContext } from "../contexts/profile.context";
import { UserContext } from "../contexts/user.context";
import { useContext } from "react";
import { auth, provider } from "../utils/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";

export const useGoogleAuth = () => {
  const { setCurrentUser } = useContext(UserContext);
  const { setCurrentProfile } = useContext(ProfileContext);

  const handleSignInClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      setCurrentUser(data);
      // localStorage.setItem("email", data.user.email);

      if (data) {
        const userProfileData = {
          name: data.user.displayName,
          email: data.user.email,
          displayPicture: data.user.photoURL,
        };
        setCurrentProfile(userProfileData);
      }
    } catch (error) {
      console.error(`error signing in with popup: ${error}`);
    }
  };

  const handleSignOutClick = async () => {
    try {
      const data = await signOut(auth);
      setCurrentUser(null);
      console.log(data);
      console.log(`user is signed out successfully. User is now ${data}`);
    } catch (error) {
      console.error(`error signing in with signout ${error}`);
    }
  };

  return {
    handleSignInClick,
    handleSignOutClick,
  };
};
