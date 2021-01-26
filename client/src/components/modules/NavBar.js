import "./NavBar.css";

import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link, navigate } from "@reach/router";
import React, { Component } from "react";

// This identifies your application to Google's authentication service
const GOOGLE_CLIENT_ID = "371897136705-uf976dbbp8kufvbgk2iqsak9ah4perbf.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.location.pathname.includes("journey")) {
      return null;
    } else {
      return (
        <nav className="NavBar-container">
          <div className="u-inlineBlock">
            <Link to={"/"} className="NavBar-link">
              Home
            </Link>
          </div>
          <div className="NavBar-linkContainer u-inlineBlock">
            {this.props.userId && (
              <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
                Profile
              </Link>
            )}
            {console.log("LOCATION" + JSON.stringify(this.props.location))}
          </div>
          <div className="google-button ">
            {this.props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={() => {
                  this.props.handleLogout();
                  navigate("/", { replace: true });
                }}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
              />
            )}
          </div>
        </nav>
      );
    }
  }
}

export default NavBar;
