import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { ProfileContext } from "../contexts/profile.context";
import { auth, provider } from "../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";

function SignIn() {
  const { setCurrentUser } = useContext(UserContext);
  const { setCurrentProfile } = useContext(ProfileContext);

  const handleClick = async () => {
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

  return (
    <>
      <List component="nav">
        <ListItem key="signIn" disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="signIn" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default SignIn;
