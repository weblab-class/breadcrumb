import "../../utilities.css";
import "./Landing.css";

import GoogleLogin, { GoogleLogout } from "react-google-login";
import React, { Component } from "react";
import { Link, navigate } from "@reach/router";

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
        <div>
        <h1>🍞</h1>
        <h2>Breadcrumb...</h2>
        <h3>Scatter your breadcrumbs on your next journey.</h3>
        {this.props.userId ? 
          ( <div>
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
          <h3>       </h3>
          <Link to={`/profile/${this.props.userId}`}> Journey to your profile </Link>
          </div>
          )
          : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        </div>
      </>
    );
  }
}

export default Landing;
