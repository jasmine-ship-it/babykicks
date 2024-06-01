import SignIn from "../../routes/googleSignIn";
import ResponsiveDrawer from "../navigation/navbar.component";
import { UserContext } from "../../contexts/user.context";
import React, { useContext } from "react";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="App">
      <header className="App-header">
        <div>{<ResponsiveDrawer />}</div>
        <div>{currentUser ? <h1>Sign Out</h1> : <SignIn />}</div>
      </header>
    </div>
  );
}

export default App;
