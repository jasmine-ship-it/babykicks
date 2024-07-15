import { ProfileContext } from "../contexts/profile.context";
import { UserContext } from "../contexts/user.context";
import { CountContext } from "../contexts/count.context";
import { useContext } from "react";
import { auth, provider, db } from "../utils/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useGoogleAuth = () => {
  const { setCurrentUser } = useContext(UserContext);
  const { setCurrentProfile } = useContext(ProfileContext);
  const { setCurrentCount } = useContext(CountContext);

  const handleSignInClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      setCurrentUser(data);

      if (data) {
        const userProfileData = {
          name: data.user.displayName,
          email: data.user.email,
          displayPicture: data.user.photoURL,
          history: data.user.history ?? [],
        };

        setCurrentProfile(userProfileData);
      }
      const docRef = doc(db, "user", data.user.email);
      const docSnap = await getDoc(docRef);

      if (data) {
        if (docSnap.exists()) {
          console.log("document history data", docSnap.data().history);
          setCurrentProfile((prevProfile) => ({
            ...prevProfile,
            history: docSnap.data().history,
          }));
        } else {
          console.log("no such document!");
        }
      }
    } catch (error) {
      console.error(`error signing in with popup: ${error}`);
    }
  };

  const handleSignOutClick = async () => {
    try {
      const data = await signOut(auth);
      setCurrentUser(null);
      setCurrentCount(0);
      console.log(data);
      console.log(`user is signed out successfully. User is now ${data}`);
    } catch (error) {
      console.error(`error signing in with signout ${error}`);
    }
  };

  const fetchProfileData = async (currentProfile) => {
    if (currentProfile && currentProfile.email) {
      const docRef = doc(db, "user", currentProfile.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("document history data", docSnap.data().history);
        const updatedProfileData = {
          history: docSnap.data().history,
        };
        setCurrentProfile(updatedProfileData);
        console.log("curentProfile", currentProfile);
      } else {
        console.log("no such document!");
      }
    }
  };

  const updateProfileHistory = async (currentProfile, updatedHistory) => {
    const docRef = doc(db, "user", currentProfile.email);
    try {
      await setDoc(docRef, { history: updatedHistory }, { merge: true });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return {
    handleSignInClick,
    handleSignOutClick,
    fetchProfileData,
    updateProfileHistory,
  };
};
