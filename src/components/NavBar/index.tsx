import React, { useState } from 'react';
import './NavBar.css'
import { useSpring, animated } from 'react-spring';
import home from '../../img/home.svg';
import calendarEvent from '../../img/calendar-event.svg';
import calendarAdd from '../../img/calendar-add.svg';
import calendarList from '../../img/calendar-list.svg';
import open from '../../img/open-navbar.svg';
import close from '../../img/close-navbar.svg';

const NavBar: React.FC<{ setShowForm: (value: boolean) => void, setShowListEvent: (value: boolean) => void, setShowHome: (value: boolean) => void }> = ({ setShowForm, setShowListEvent, setShowHome }) => {

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
    <div className='NavBar'>

      <animated.div
        style={{
          width: width.interpolate((width) => `${width}px`),
          overflow: 'hidden',
        }}
      >

        <ul className='container-optNavBar'>

          <div>

            <li className='optNavBar'>
              <img src={home} alt="home-icon"/>
            </li>

            <li className='optNavBar'>
            <animated.span style={{ opacity }} onClick={() => { setShowHome(true); setShowForm(false); setShowListEvent(false); }}>{isOpen ? 'Home' : null}</animated.span>
            </li>

          </div>

          <div>

            <li className='optNavBar'>
              <img src={calendarAdd} alt="createEvent-icon"/>
            </li>

            <li className='optNavBar'>
              <animated.span style={{ opacity }} onClick={() => { setShowForm(true); setShowListEvent(false); setShowHome(false);}}>{isOpen ? 'Create Event' : null}</animated.span>
            </li>

          </div>

          <div>

            <li className='optNavBar'>
              <img src={calendarList} alt="createEvent-icon"/>
            </li>

            <li className='optNavBar'>
              <animated.span style={{ opacity }} onClick={() => { setShowForm(false); setShowListEvent(true); setShowHome(false);}}>{isOpen ? 'Event List' : null}</animated.span>
            </li>

          </div>

          <div>

            <li className='optNavBar'>
            <img 
                src={isOpen ? close : open} 
                alt="navbar-icon" 
                onClick={() => setIsOpen(!isOpen)} 
                style={{ transform: isOpen ? 'rotate(360deg)' : '' }}
            />
            </li>

          </div>
          
          
        </ul>

      </animated.div>

    </div>
  );
};

export { NavBar };
