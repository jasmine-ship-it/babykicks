import React from "react";
import { Routes, Route } from "react-router-dom";
// import { UserContext } from "../../contexts/user.context";
// import SignIn from "../../routes/googleSignIn";
import Home from "../../pages/home";
import Count from "../../pages/count";
import Settings from "../../pages/settings";
import History from "../../pages/history";
import Profile from "../../pages/profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
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
