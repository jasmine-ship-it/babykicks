import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function SignedOutAlert() {
  return (
    <Stack sx={{ width: "100%" }}>
      {/* <Alert severity="success">This is a success Alert.</Alert> */}
      {/* <Alert severity="info">This is an info Alert.</Alert> */}
      {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
      <Alert severity="info">Please sign in to enable counting feature!</Alert>
    </Stack>
  );
}
