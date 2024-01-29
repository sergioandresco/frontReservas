import React, { useState } from 'react';
import './NavBar.css'
import { useSpring, animated } from 'react-spring';
import home from '../../img/home.svg';
import calendarEvent from '../../img/calendar-event.svg';
import calendarAdd from '../../img/calendar-add.svg';
import calendarList from '../../img/calendar-list.svg';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { width } = useSpring({
    width: isOpen ? 100 : 60,
    from: { width: 60 },
    config: { duration: 300 },
  });

  const { opacity } = useSpring({
    opacity: isOpen ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 },
  });

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0}} className='NavBar'>

      <animated.div
        style={{
          width: width.interpolate((width) => `${width}px`),
          overflow: 'hidden',
        }}
      >

        <ul className='container-optNavBar'>

          <li className='optNavBar'>
            <img src={home} alt="home-icon" onClick={() => setIsOpen(!isOpen)}/>
          </li>

          <li className='optNavBar'>
            <animated.span style={{ opacity }}>{isOpen ? 'Home' : null}</animated.span>
          </li>

          
        </ul>

      </animated.div>

    </div>
  );
};

export { NavBar };
