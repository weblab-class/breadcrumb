import "./SideBar.css";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

import React, { useState } from "react";

import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

function SideBar({ crumbs }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  console.log("LOADING SIDE MENU", typeof crumbs, crumbs);

  return (
    <>
      <IconContext.Provider value={{ style: { color: "#fff" } }} className="hamburger">
        <div className="nav-icon">
          <FaIcons.FaBars value={{ style: { color: "#fff" } }} onClick={showSidebar} />
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="close-button">
            <IconContext.Provider value={{ style: { color: "#ff85523Cf" } }} className="hamburger">
              <FaIcons.FaWindowMinimize onClick={showSidebar} />
            </IconContext.Provider>
          </div>

          {crumbs.map((item, index) => {
            return (
              <div key={index} className="crumb-side-entry">
                <span>
                  {item.title} <br></br>{" "}
                </span>
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
