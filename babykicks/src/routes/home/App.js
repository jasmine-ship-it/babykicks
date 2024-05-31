import logo from "../../logo.svg";
import "./App.css";
import SignIn from "../../routes/googleSignIn";
import { UserContext } from "../../contexts/user.context";
import React, { useContext } from "react";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{currentUser ? <h1>Sign Out</h1> : <SignIn />}</div>
      </header>
    </div>
  );
}

export default App;
