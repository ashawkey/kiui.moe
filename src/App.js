import React, {useState, useEffect} from 'react';
import './App.css';
import icon_white_heart from "./white.png"
import icon_purple_heart from './purple.png'
import icon_clock from './clock.png'
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

function App() {
  const [page, setPage] = useState(0);

  // href and icon
  const pages = [
    {
      color: '#b0cfff',
      component: <a href="https://hawia.xyz/blogs"> <img className="icon heart" src={icon_white_heart}/> </a>,
    },
    {
      color: '#DDFF99',
      component: <a href="https://hawia.xyz/nonsense"> <img className="icon heart" src={icon_purple_heart}/> </a>,
    },
    {
      color: '#66BAB7',
      component: <a href="https://hawia.xyz/clock"> <img className="icon clock" src={icon_clock}/> </a>,
    },
  ]

  function prevPage() {
    setPage((page - 1 + pages.length) % pages.length);
    //console.log('prev', page);
  }

  function nextPage() {
    setPage((page + 1) % pages.length);
    //console.log('next', page);
  }

  return (
    <div className="App">
      <div className="fullscreen">
        <ReactScrollWheelHandler
          upHandler={prevPage}
          downHandler={nextPage}
          leftHandler={prevPage}
          rightHandler={nextPage}
          customStyle={{
            width: "100%",
            height: "100vh",
            backgroundColor: pages[page].color,
            transition: "background-color .5s ease-out",
          }}
        >
          <div className='centered unselectable'>
            {pages[page].component}
          </div>
        </ReactScrollWheelHandler>
      </div>
    </div>
  );
}

export default App;
