import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { auth, provider, db } from "../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignIn() {
  const { setCurrentUser } = useContext(UserContext);

  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      setCurrentUser(data);
      localStorage.setItem("email", data.user.email);
      console.log(data);

      await setDoc(doc(db, "user", data.user.email), {
        name: data.user.displayName,
        email: data.user.email,
        displayPicture: data.user.photoURL,
      });
    } catch (error) {
      console.error(`error signing in with popup: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
