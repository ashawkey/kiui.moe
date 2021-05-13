import React, {useState, useEffect, useRef} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './phoebe.css'

import ph_00 from './static/ph_00.png'
import ph_01 from './static/ph_01.png'
import ph_11 from './static/ph_11.png'
import ph_12 from './static/ph_12.png'
import ph_13 from './static/ph_13.png'
import notif_icon from './static/notification_icon.png';

function Pheobe() {
  
  const [stage, setStage] = useState(0);
  const [frame, setFrame] = useState(0);
  const [line, setLine] = useState('Init'); // fill in init to ensure the font size is applied even invisible
  const [lineIdx, setLineIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [sprite, setSprite] = useState(ph_00);
  
  const on_phone = window.screen.width <= 400;

  const intervalRef = useRef();

  const animations = {
    // idle
    0: [ph_00, ph_00, ph_01, ph_01],
    // confusing
    1: [ph_00, ph_11, ph_12, ph_13, ph_13, ph_13, ph_13, ph_13, ph_13, ph_12, ph_11, ph_00],
  }

  const lines = [
    "Welcome to haw's homepage.",
    "I'm here to guide you.",
    "Feel free to scroll and see around.",
  ]

  // animation 
  useEffect(() => {
    intervalRef.current = setInterval(animate, 250);
    return () => {
      clearInterval(intervalRef.current);
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
    // enter stage 1
    if (stage === 0) {
      setStage(1);
      setFrame(0);
    }
  }

  // start a bubble to pop up line l.
  function startBubble(l) {
    if (!visible) {
      setLine(l);
      setVisible(true);
    }
  }
 
  // click the sprite for auto conversation.
  function handleClick(event) {
    event.preventDefault();
    if (!visible) {
      startBubble(lines[lineIdx]);
      if (lineIdx < lines.length - 1) setLineIdx((lineIdx + 1) % lines.length);
    }
  }
  
  // hide the bubble after line end.
  function handleBubbleEnd(event) {
    event.preventDefault();
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }
  
  // render a float bar for configurations
  function Floater() {
    const remindInterval = 60 * 60;

    const [checked, setChecked] = useState(false);
    const [rtime, setRtime] = useState(remindInterval);
    
    const intervalRef = useRef();
    const notificationRef = useRef();

    useEffect(() => {
      if (checked) {
        intervalRef.current = setInterval(tick, 1000);
      }
      return () => {
        clearInterval(intervalRef.current);
      };
    }, [rtime, checked]);

    function tick() {
      //console.log('tick', rtime);
      if (rtime > 0) {
        setRtime((rtime) => rtime - 1);
      } else {
        // notify and reset.
        setRtime((rtime) => remindInterval);
        showNotification();
      }
    }

    function formatTime(t) {
      var minutes = Math.floor(t / 60);
      var seconds = t - minutes * 60;
      return 'Remaining ' + (minutes >= 10 ? '' : '0') + minutes.toString() + ':' + (seconds >= 10 ? '' : '0') + seconds.toString();
    }

    function showNotification() {
      var options = {
        body: "Time to have a rest.",
        icon: notif_icon,
        dir: "ltr" // text direction, left to right.
      };
      notificationRef.current = new Notification("Hey!", options);
    }

    function handleCheck(event) {
      event.preventDefault();
      if (event.target.checked) {
        if (!('Notification' in window)) {
          startBubble("Sorry, but this browser doesn't support notification.");
          setChecked(false);
        } else  {
          startBubble("Okay. Remember to turn on notification.");
          Notification.requestPermission();
          setChecked(true);
          setRtime(remindInterval);
        }
      } else {
        setChecked(false);
        startBubble("Notifiction stopped.");
      }
    }

    return (
      <div className='floater'> 
        <Checkbox disabled={visible} color="default" checked={checked} onChange={handleCheck} name="timer" />
        {checked ? formatTime(rtime) : 'Remind me every hour.'}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <div className="container centered unselectable" onClick={(e) => {e.preventDefault(); handleClick(e)}}>
        <div className='bubble' style={{
          visibility: visible ? 'visible' : 'hidden',
          animation: visible? ('typing ' + Math.floor(line.length / 15).toString() + 's' + ' steps(' + Math.floor(line.length * 1.5).toString() + ', end)') : null,
          fontSize: on_phone ? '16px' : '22px',
        }} onAnimationEnd={(e) => {handleBubbleEnd(e)}}>
          {line}
        </div>
        <img alt="sprite" className="ph" onMouseEnter={(e) => {handleEnter(e)}} src={sprite}/>
      </div>
      {Floater()}
    </React.Fragment>
  );
}

export default Pheobe;