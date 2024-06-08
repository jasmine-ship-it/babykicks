import React, { useContext } from "react";
import { CountContext } from "../contexts/count.context";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function Count() {
  const drawerWidth = 240;
  const { currentCount, setCurrentCount } = useContext(CountContext);

  const handleCountClick = () => {
    setCurrentCount(currentCount + 1);
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
          <Typography paragraph>
            Current baby count is {currentCount}
          </Typography>
          <Button onClick={handleCountClick}>Count kick</Button>
        </Box>
      </Box>
    </>
  );
}

export default Count;
