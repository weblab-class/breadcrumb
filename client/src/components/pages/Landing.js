import "../../utilities.css";
import "./Landing.css";

import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link, navigate } from "@reach/router";
import React, { Component } from "react";

const GOOGLE_CLIENT_ID = "371897136705-uf976dbbp8kufvbgk2iqsak9ah4perbf.apps.googleusercontent.com";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    document.title = "Breadcrumb";
  }

  render() {
    return (
      <>
        <div className="landing-container">
          <img
            className="bread-emoji"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/bread_1f35e.png"
          ></img>
          <h2>Breadcrumb...</h2>
          <h3>
            Scatter your breadcrumbs <br /> on your next journey.
          </h3>

          <div className="centered">
            <h2 className="demo">Demo!</h2>
            <iframe
              src="https://player.vimeo.com/video/504940062"
              width="740"
              height="395"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
