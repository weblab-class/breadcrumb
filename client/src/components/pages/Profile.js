import React, { Component } from "react";
import { get, post } from "../../utilities";
import { GoogleLogout } from "react-google-login";
import { navigate, Router } from "@reach/router";
import MakeJourney from "./MakeJourney";

import "../../utilities.css";
import "./Profile.css";
import { render } from "react-dom";


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

  getCurrentTime = () => {
    let systemTime = new Date();
    let month = systemTime.getMonth();
    let day = systemTime.getDate();
    let year = systemTime.getFullYear();
    let hours = systemTime.getHours();
    let minutes = systemTime.getMinutes();
    let seconds = systemTime.getSeconds();
    let mili = systemTime.getMilliseconds();
    let fulltime = month.toString() + day.toString() + year.toString() + hours.toString() + minutes.toString() + seconds.toString() + mili.toString();
    
    return fulltime;
}

makeNewMap = () => {
    let _,name = this.state.user.name.split(' ');
    let first = name[0];
    let last = name[1];

    let journeyId = first + last + this.getCurrentTime();
    let mapPath = '/makejourney/' + journeyId;
    post("/api/journey", { creator_id: this.state.user, journey_id: journeyId });
    navigate(mapPath);
}


render() {
    if (!this.state.user) {
        return <div> Loading! </div>;
    }
    return (
        <>
        <div className = 'journeyButton'>
                <button className="plus radius" onClick={this.makeNewMap}>  </button>
        </div>
        <div className="infoContainer">
            <h1 className="profileName">{this.state.user.name}</h1>
            {/* <h2 className='about'>Insert location here</h2>
            <h2 className='about'>Insert bio here</h2>
            <h2 className='about'>Number of journeys</h2> */}
        </div>

            {/* <input type="file" accept="image/*" onChange={this.handleImageUpload} multiple = "false" /> */}
        

        </>
      );
    }
}
  


export default Profile;