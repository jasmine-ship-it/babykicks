import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/routes/home/App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/user.context";
import { CountProvider } from "./contexts/count.context";
import { ProfileProvider } from "./contexts/profile.context";
import { TimeProvider } from "./contexts/timer.context";
import { setupTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const theme = setupTheme();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProfileProvider>
          <CountProvider>
            <TimeProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <App />
              </ThemeProvider>
            </TimeProvider>
          </CountProvider>
        </ProfileProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
