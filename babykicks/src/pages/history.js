import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinePlot from "../components/graph.component";

function History() {
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
          <Typography paragraph>History page</Typography>
          <Typography paragraph></Typography>
          <LinePlot/>
        </Box>
      </Box>
    </>
  );
}

export default History;
