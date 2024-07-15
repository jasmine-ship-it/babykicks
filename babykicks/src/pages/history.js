import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { ProfileContext } from "../contexts/profile.context";
import { HistoryTable } from "../components/HistoryTable";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinePlot from "../components/graph.component";
import SignedOutAlert from "../components/alert.component";

function History() {
  const drawerWidth = 240;
  const { currentUser } = useContext(UserContext);
  const { currentProfile } = useContext(ProfileContext);

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
          <Typography paragraph>History page</Typography>
          <Typography paragraph></Typography>
          {!currentUser && <SignedOutAlert />}
          {currentUser && <HistoryTable />}
          {currentProfile && <LinePlot />}
        </Box>
      </Box>
    </>
  );
}

export default History;
