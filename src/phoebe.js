import React, {useState, useEffect} from 'react';
import './phoebe.css'

import ph_00 from './static/ph_00.png'
import ph_01 from './static/ph_01.png'
import ph_11 from './static/ph_11.png'
import ph_12 from './static/ph_12.png'
import ph_13 from './static/ph_13.png'

function Pheobe() {
  const [stage, setStage] = useState(0);
  const [line, setLine] = useState(0);
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(false);
  const [sprite, setSprite] = useState(ph_00);

  const animations = {
    0: [ph_00, ph_00, ph_01, ph_01],
    1: [ph_00, ph_11, ph_12, ph_13, ph_13, ph_13, ph_13, ph_13, ph_13, ph_12, ph_11, ph_00],
  }

  const lines = [
    "Welcome to haw's homepage.",
    "Feel free to scroll and see around.",
  ]

  // idle animation
  useEffect(() => {
    const saver = setInterval(animate, 250);
    return () => {
      clearInterval(saver);
    };
  });

  function animate() {
    setFrame((frame + 1) % animations[stage].length);
    setSprite(animations[stage][frame]);
    // return to idle animation (stage 0) when finished stage 1 once
    if ((stage === 1) && (frame === animations[stage].length - 1)) {
      setStage(0);
      setFrame(0);
    }
  }

  function handleEnter(event) {
    event.preventDefault();
    if (stage === 0) {
      setStage(1);
      setFrame(0);
    }
  }

  function handleClick(event) {
    event.preventDefault();
    if (!visible) {
      setVisible(true);
    }
  }
  
  function handleBubbleEnd(event) {
    event.preventDefault();
    // hide the visible after animation end.
    setTimeout(() => {
      setVisible(false);
      if (line < lines.length - 1) {
        setLine((line + 1) % lines.length);
      }
    }, 1500);
  }
  
  return (
    <div className="container" onClick={(e) => {handleClick(e)}}>
      <div className='bubble' style={{
        visibility: visible ? 'visible' : 'hidden',
        animation: visible? ('typing ' + Math.floor(lines[line].length / 12).toString() + 's' + ' steps(' + Math.floor(lines[line].length * 1.5).toString() + ', end)') : null,
        fontSize: window.screen.width <= 400 ? '16px' : '22px',
      }} onAnimationEnd={(e) => {handleBubbleEnd(e)}}>
          {lines[line]}
      </div>
      <img alt="sprite" className="ph" 
           onMouseEnter={(e) => {handleEnter(e)}}
           src={sprite}/>
    </div>
  );
}

export default Pheobe;