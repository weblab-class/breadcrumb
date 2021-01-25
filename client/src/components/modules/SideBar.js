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
      <IconContext.Provider value={{ style: {color: '#fff' }}} className="hamburger">

        <div className='nav-icon'>
            <FaIcons.FaBars onClick={showSidebar} />
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

            <div className="close-button">
                <FaIcons.FaWindowMinimize value={{ style: {fill: 'brown' }}} onClick={showSidebar} />
            </div>
        
            {crumbs.map((item, index) => {
              return (
                <div key={index} className="crumb-side-entry">
                    <span>{item.title} <br></br> </span> 
                    {item.description}
                </div>
              );
            })}
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
