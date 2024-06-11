import React, { useContext } from "react";
import { CountContext } from "../contexts/count.context";
import { ProfileContext } from "../contexts/profile.context";
import { UserContext } from "../contexts/user.context";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SignedOutAlert from "../components/alert.component";

import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase/config";

function Count() {
  const drawerWidth = 240;
  const { currentCount, setCurrentCount } = useContext(CountContext);
  const { currentProfile } = useContext(ProfileContext);
  const { currentUser } = useContext(UserContext);
  //add time context to manage time
  //start timer when currentCount is greater than 0.

  //stop timer when handleSessionClick is clicked.

  //add new session context to manage status

  //useEffect to track time

  const handleCountClick = () => {
    if (currentUser) {
      setCurrentCount(currentCount + 1);
    }
  };

  const handleSessionClick = async () => {
    if (currentUser) {
      const start = Date.now();
      const docRef = doc(db, "user", currentProfile.email);

      //add new object onto firestore - time duration, start time
      const newObject = {
        time: start,
        count: currentCount,
      };
      try {
        updateDoc(docRef, {
          history: arrayUnion(newObject),
        });
        setCurrentCount(0);
      } catch (error) {
        console.log(`error in updating doc ${error}`);
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        ></Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {!currentUser && <SignedOutAlert />}
          {currentUser && (
            <Typography paragraph>
              Current baby count is {currentCount}
            </Typography>
          )}
          <Button onClick={handleCountClick}>Count kick</Button>
          <Button onClick={handleSessionClick}>Save session</Button>
        </Box>
      </Box>
    </>
  );
}

export default Count;
