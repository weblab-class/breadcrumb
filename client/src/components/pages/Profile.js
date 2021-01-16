import React, { Component } from "react";
import { get } from "../../utilities";
import { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";
import { render } from "react-dom";


class Profile extends Component {
    constructor(props) {
        super(props);

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
        <h1>hi</h1>
        </>
      );
    }
}
  


export default Profile;