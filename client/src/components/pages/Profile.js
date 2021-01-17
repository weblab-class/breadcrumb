import React, { Component } from "react";
import { get } from "../../utilities";
import { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";
import { render } from "react-dom";
import NavBar from "../modules/NavBar";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            bio: undefined,
            location: undefined,
        };

        

    }


componentDidMount() {
    document.title = "Profile Page";

    get(`/api/whoami`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));

  }


render() {
    if (!this.state.user) {
        return <div> Loading! </div>;
    }
    return (
        <>
        <NavBar 
            userId = {this.state.user} 
            handleLogin={this.handleLogin}
            handleLogout={this.props.handleLogout}
        />
        <div className="infoContainer">
            <h1 className="profileName">{this.state.user.name}</h1>
            <h2 className='about'>Insert location here</h2>
            <h2 className='about'>Insert bio here</h2>
            <h2 className='about'>Number of journeys</h2>
        </div>

            {/* <input type="file" accept="image/*" onChange={this.handleImageUpload} multiple = "false" /> */}
        

        </>
      );
    }
}
  


export default Profile;