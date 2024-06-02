import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "../routes/navigation/navbar.component";

function Home() {
  return (
    <>
      <ResponsiveDrawer />
      <Outlet />
    </>
  );
}

export default Home;
