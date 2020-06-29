import React from 'react';
import './App.css';
import heart from "./heart.png"

function App() {
  return (
    <div className="App">
      <div className="header"> 
        Hawia &
        <hr className="fancy-line" />
      </div>
      <div className="content">
        Seeking consolation of meaning in a mad song, walking alone on the bright road.<br/>
        <img className="heart" src={heart} alt="heart"/> <br/>
        <a href="https://ashawkey.github.io/blogs">Blogs</a>
      </div>
      <div className="footer">
        <hr className="fancy-line" />
        @ hawkey
      </div>
    </div>
  );
}

export default App;
