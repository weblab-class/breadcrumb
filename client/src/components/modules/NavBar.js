import React, { Component } from "react";
import { Link, navigate }  from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class NavBar extends Component {
    constructor(props) {
      super(props);

      this.state = {};
      console.log(this.props.userId);
    }


    render() {
        return (
            <nav className="NavBar-container">
                {this.props.userId ? 
                ( <div>
                    <GoogleLogout className = 'logoutButton'
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                    />
                </div>
            ) : (
                <GoogleLogin className = 'logoutButton'
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.props.handleLogin}
                  onFailure={(err) => console.log(err)}
                />
              )}
              <div className = 'journeyButton'>
                <Link to='/makejourney'>
                    <button className="plus radius">  </button>
                </Link>
                </div>
            </nav>
        );
    }
}

export default NavBar;