import "../../utilities.css";
import "./Landing.css";

import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link, navigate } from "@reach/router";
import React, { Component } from "react";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "371897136705-uf976dbbp8kufvbgk2iqsak9ah4perbf.apps.googleusercontent.com";

class Landing extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
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
          {/* {this.props.userId ? 
          ( <div >
          <h3>       </h3>
          <Link to={`/profile/${this.props.userId}`}> Journey to your profile </Link>
          </div>
          )
          : 
          console.log('not signed in')
        } */}
        </div>
      </>
    );
  }
}

export default Landing;
