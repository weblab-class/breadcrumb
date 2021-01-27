import "./SideBar.css";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

import { Component, useState } from "react";

import { IconContext } from "react-icons";
import React from "react";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: false,
    };

    const updateSelectedCrumb = (crumb) => {
      this.props.updateSelectedCrumb(crumb);
    };
  }

  render() {
    const showSidebar = () => this.setState({ sidebar: !this.state.sidebar });

    return (
      <>
        <IconContext.Provider value={{ style: { color: "#fff" } }} className="hamburger">
          <div className="nav-icon">
            <FaIcons.FaBars value={{ style: { color: "#fff" } }} onClick={showSidebar} />
          </div>

          <nav className={this.state.sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="close-button">
              <FaIcons.FaWindowMinimize color="brown" onClick={showSidebar} />
            </div>

            {this.props.crumbs.map((crumb, index) => {
              return (
                <div
                  key={index}
                  className="crumb-side-entry"
                  onClick={(event) => {
                    this.props.updateSelectedCrumb(crumb);
                  }}
                >
                  <span>
                    {crumb.title} <br></br>{" "}
                  </span>
                  {crumb.description}
                </div>
              );
            })}
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default SideBar;
