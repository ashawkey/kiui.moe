import React, {useState} from 'react';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import './App.css';

import icon_grey_heart from "./static/grey.png"
import icon_purple_heart from './static/purple.png'
import icon_white_heart from './static/white.png'
import icon_timer from './static/timer.png'

import Pheobe from './phoebe'


function App() {
  const [page, setPage] = useState(0);

  // href and icon
  const pages = [
    {
      name: 'phoebe',
      color: '#FFBA84',
      component: Pheobe(),
    },
    {
      name: 'nonsense',
      color: '#adadad',
      component: <a href="https://hawia.xyz/nonsense/"> <img alt="purple" className="icon heart" src={icon_purple_heart}/> </a>,
    },
    {
      name: 'blogs',
      color: '#a5c7c9',
      component: <a href="https://hawia.xyz/blogs/"> <img alt="grey" className="icon heart" src={icon_grey_heart}/> </a>,
    },
    {
      name: 'umbra',
      color: '#ffcccc',
      component: <a href="https://hawia.xyz/umbra/"> <img alt="white" className="icon heart" src={icon_white_heart}/> </a>,
    },
    {
      name: 'lifetime',
      color: '#ffffff',
      component: <a href="https://hawia.xyz/lifetime/"> <img alt="timer" className="icon timer" src={icon_timer}/> </a>,
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
            height: "100%",
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
