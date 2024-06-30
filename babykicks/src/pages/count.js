import React, { useContext } from "react";
import { CountContext } from "../contexts/count.context";
import { ProfileContext } from "../contexts/profile.context";
import { UserContext } from "../contexts/user.context";
import { TimeContext } from "../contexts/timer.context";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SignedOutAlert from "../components/alert.component";

import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase/config";

function Count() {
  const drawerWidth = 240;
  const { currentCount, setCurrentCount } = useContext(CountContext);
  const { currentProfile, setCurrentProfile } = useContext(ProfileContext);
  const { currentUser } = useContext(UserContext);
  const { timeData, setTimeData } = useContext(TimeContext);

  //add time context to manage time
  //start timer when currentCount is greater than 0.
  //stop timer when handleSessionClick is clicked.
  //add new session context to manage status

  const handleStrengthClick = () => {
    if (currentUser) {
      setCurrentCount(currentCount + 1);
    }
  };

  const handleStartClick = () => {
    if (currentUser) {
      let currentTimeStamp = Date.now();
      let currentTime = new Date(currentTimeStamp);
      let isoString = currentTime.toISOString();

      let startHours = currentTime.getHours();
      let startMinutes = currentTime.getMinutes();
      let startSeconds = currentTime.getSeconds();

      setTimeData({
        ...timeData,
        startTime: isoString,
        startHours: startHours,
        startMinutes: startMinutes,
        startSeconds: startSeconds,
      });
    }
  };

  const handleStopClick = () => {
    if (currentUser) {
      let currentTimeStamp = Date.now();
      let currentTime = new Date(currentTimeStamp);
      let isoString = currentTime.toISOString();

      let stopHours = currentTime.getHours();
      let stopMinutes = currentTime.getMinutes();
      let stopSeconds = currentTime.getSeconds();

      let hoursDiff = stopHours - timeData.startHours;
      let minsDiff = stopMinutes - timeData.startMinutes;
      let secsDiff = stopSeconds - timeData.startSeconds;

      setTimeData({
        ...timeData,
        stopTime: isoString,
        stopHours: stopHours,
        stopMinutes: stopMinutes,
        stopSeconds: stopSeconds,
        hoursDiff: hoursDiff,
        minsDiff: minsDiff,
        secsDiff: secsDiff,
      });
    }
  };

  const handleSessionClick = async () => {
    if (currentUser) {
      console.log("handlesession current profile", currentProfile);
      console.log("handlesession currentUser", currentUser);
      const docRef = doc(db, "user", currentProfile.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("document history data", docSnap.data().history);
        const updatedProfileData = {
          ...currentProfile,
          history: docSnap.data().history,
        };
        setCurrentProfile(updatedProfileData);
      } else {
        console.log("no such document!");
      }

      let currentTimeStamp = Date.now();
      let currentDate = new Date(currentTimeStamp);
      let readableDate = currentDate.toISOString().split("T")[0];

      const newObject = {
        date: readableDate,
        strength: currentCount,
        startTime: timeData.startTime,
        startHours: timeData.startHours,
        startMinutes: timeData.startMinutes,
        startSeconds: timeData.startSeconds,
        stopTime: timeData.stopTime,
        stopHours: timeData.stopHours,
        stopMinutes: timeData.stopMinutes,
        stopSeconds: timeData.stopSeconds,
        hoursDiff: timeData.hoursDiff,
        minsDiff: timeData.minsDiff,
        secsDiff: timeData.secsDiff,
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
            <Typography paragraph>Strength of kick {currentCount}</Typography>
          )}
          <Button onClick={handleStrengthClick}>Strength</Button>
          <Button onClick={handleStartClick}>Start</Button>
          <Button onClick={handleStopClick}>Stop</Button>
          <Button onClick={handleSessionClick}>Save</Button>
        </Box>
      </Box>
    </>
  );
}

export default Count;
