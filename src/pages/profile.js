import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ProfileContext } from "../contexts/profile.context";

function Profile() {
  const { currentProfile } = useContext(ProfileContext);

  const drawerWidth = 240;

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
          <Typography paragraph>Profile page</Typography>
          <Typography paragraph>
            Email address: {currentProfile.email}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
