import React from 'react';
import './App.css';
import white_heart from "./white.png"

function App() {
  return (
    <div className="App">
      <div className="centered">
        <a href="https://ashawkey.github.io/blogs"> <img className="heart" src={white_heart} alt="heart"/> </a>
      </div>
    </div>
  );
}

export default App;
