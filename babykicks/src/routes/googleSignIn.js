import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";
import Home from "../pages/home";
import { doc, setDoc } from "firebase/firestore";

function SignIn() {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      setValue(data.user.email);
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
      {value ? (
        <Home />
      ) : (
        <button onClick={handleClick}>Sign in with Google</button>
      )}
    </div>
  );
}

export default SignIn;
