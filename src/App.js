import React, {useEffect, useState} from 'react';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import './App.css';

import icon_grey_heart from "./static/grey.png"
import icon_purple_heart from './static/purple.png'
import icon_white_heart from './static/white.png'
import icon_timer from './static/timer.png'

import Pheobe from './phoebe'


function App() {
  const [page, setPage] = useState(0);
  const [line, setLine] = useState(0);
  const [saver, setSaver] = useState(null);
  const [visible, setVisible] = useState(false);
  
  function renderPage(p) {
    return (
      <div className="container" onMouseEnter={(e) => {handleEnter(e)}} onMouseLeave={(e) => {handleLeave(e)}}>
        <div className='bubble' style={{
          visibility: visible ? 'visible' : 'hidden',
          animation: visible ? ('typing ' + (Math.floor(p.lines[line].length / 15) + 0.5).toString() + 's' + ' steps(' + Math.floor(p.lines[line].length * 1.5).toString() + ', end)') : null,
          fontSize: window.screen.width <= 400 ? '16px' : '22px',
        }} onAnimationEnd={(e) => {handleBubbleEnd(e, p.lines.length)}}>
          {p.lines[line]}
        </div>
        {p.component}
      </div>
    );
  }

  function handleEnter(event) {
    event.preventDefault();
    var tmp = setTimeout(() => {
      setVisible(true);
    }, 1500);
    setSaver(tmp);
    //console.log('set')
  }

  function handleLeave(event) {
    event.preventDefault();
    if (saver !== null) {
      clearTimeout(saver);
      setSaver(null);
    }
    //console.log('cleared')
  }

  function handleBubbleEnd(event, length) {
    event.preventDefault();
    // hide the visible after animation end.
    setTimeout(() => {
      setVisible(false);
      if (line < length - 1) {
        setLine((line + 1) % length);
      }
    }, 2000);
  }

  // href and icon
  const pages = [
    {
      name: 'phoebe',
      color: '#FFBA84',
    },
    {
      name: 'nonsense',
      color: '#adadad',
      lines: ['This is NoNSeNSe, a minimal online note taking App.'],
      component: <a href="https://hawia.xyz/nonsense/"> <img alt="purple" className="icon heart" src={icon_purple_heart}/> </a>,
    },
    {
      name: 'umbra',
      color: '#ffcccc',
      lines: ['Ubi est lux, illic est umbra.'],
      component: <a href="https://hawia.xyz/umbra/"> <img alt="white" className="icon heart" src={icon_white_heart}/> </a>,
    },
    {
      name: 'lifetime',
      color: '#ffffff',
      lines: ['Memento mori.'],
      component: <a href="https://hawia.xyz/lifetime/"> <img alt="timer" className="icon timer" src={icon_timer}/> </a>,
    },
    {
      name: 'blogs',
      color: '#a5c7c9',
      lines: ['Well ... This used to be a blog system, but now almost unused.'],
      component: <a href="https://hawia.xyz/blogs/"> <img alt="grey" className="icon heart" src={icon_grey_heart}/> </a>,
    },
  ] 

  const rendered_pages = [
    Pheobe(),
    renderPage(pages[1]),
    renderPage(pages[2]),
    renderPage(pages[3]),
    renderPage(pages[4]),
  ]

  function prevPage() {
    setVisible(false); 
    setLine(0);
    setPage((page - 1 + pages.length) % pages.length);
    //console.log('prev', page);
  }
  
  function nextPage() {
    setVisible(false); 
    setLine(0);
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
            {rendered_pages[page]}
          </div>
        </ReactScrollWheelHandler>
      </div>
    </div>
  );
}

export default App;
