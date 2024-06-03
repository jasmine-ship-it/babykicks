import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { auth } from "../utils/firebase/config";
import { signOut } from "firebase/auth";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";

function SignOut() {
  const { setCurrentUser } = useContext(UserContext);

  const handleClick = async () => {
    try {
      const data = await signOut(auth);
      setCurrentUser(null);
      console.log(data);
      console.log(`user is signed out successfully. User is now ${data}`);
    } catch (error) {
      console.error(`error signing in with signout ${error}`);
    }
  };

  return (
    <>
      <List component="nav">
        <ListItem key="signIn" disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="sign out" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default SignOut;
