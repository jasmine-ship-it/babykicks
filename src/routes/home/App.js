import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import Count from "../../pages/count";
import Settings from "../../pages/settings";
import History from "../../pages/history";
import Profile from "../../pages/profile";
import "../../../src/index.css";
import ResponsiveDrawer from "../navigation/navbar.component";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResponsiveDrawer />}>
          <Route index element={<Home />} />
          <Route path="count" element={<Count />} />
          <Route path="settings" element={<Settings />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
