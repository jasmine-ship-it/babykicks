import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Home() {
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
          <Typography
            paragraph
            sx={{ fontFamily: "Abril Fatface", fontSize: "2.5rem" }}
          >
            Feel Every Little Moment
          </Typography>
          <Typography paragraph>
            Every baby moves in their own special way — kicks, flutters, rolls,
            and wiggles. As your pregnancy progresses, these movements will
            become more noticeable, especially between 16 and 32 weeks.
          </Typography>
          <Typography paragraph>
            There’s no “normal” number of movements, but your baby will develop
            a pattern that’s unique to them — and getting to know that pattern
            is important.
          </Typography>
          <Typography paragraph>
            If this is your first baby, you might not feel movement until after
            20 weeks. But if you ever notice a change or reduction in your
            baby's usual activity, it's always okay to reach out for help. Many
            women who experienced stillbirth had noticed a slowdown or stop in
            movement beforehand.
          </Typography>
          <Typography paragraph>
            Your peace of mind matters. If you’re ever concerned — even if
            everything was normal before — contact your midwife or maternity
            unit. Never hesitate. You know your baby best.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Home;
