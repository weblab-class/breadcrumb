import "../../utilities.css";
import "./Skeleton.css";

import GoogleLogin, { GoogleLogout } from "react-google-login";
import React, { Component } from "react";

const GOOGLE_CLIENT_ID = "371897136705-uf976dbbp8kufvbgk2iqsak9ah4perbf.apps.googleusercontent.com";

class Skeleton extends Component {
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
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </>
    );
  }
}

export default Skeleton;
