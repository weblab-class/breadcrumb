import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { IconContext } from 'react-icons';

function SideBar({crumbs}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  console.log("LOADING SIDE MENU", typeof crumbs, crumbs);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }} className="hamburger">

        <div className='navbar'>
            <FaIcons.FaBars onClick={showSidebar} />
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <FaIcons.FaBars onClick={showSidebar} />
            
          <ul className='nav-menu-items'>
            {crumbs.map((item, index) => {
              return (
                <li key={index} >
                    <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
