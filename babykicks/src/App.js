import logo from "./logo.svg";
import "./App.css";
import SignIn from "../src/Components/Firebase/googleSignIn";

function App() {
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
        {<SignIn />}
      </header>
    </div>
  );
}

export default App;
