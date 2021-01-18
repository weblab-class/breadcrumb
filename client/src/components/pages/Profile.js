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
            journeys: undefined,
        };
    }


componentDidMount() {
    document.title = "Profile Page";

    get(`/api/whoami`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));

  }

  getCurrentTime = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let systemTime = new Date();
    let month = systemTime.getMonth();
    let day = systemTime.getDate();
    let year = systemTime.getFullYear();
    let hours = systemTime.getHours();
    let minutes = systemTime.getMinutes();
    let seconds = systemTime.getSeconds();
    let mili = systemTime.getMilliseconds();
    let fulltime = month.toString() + day.toString() + year.toString() + hours.toString() + minutes.toString() + seconds.toString() + mili.toString();
    let formattedDateTime = monthNames[month] + ' ' + day.toString() + ', ' + year.toString() + ' ' + hours.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ':' + mili.toString();
    
    return [fulltime,formattedDateTime];
}

makeNewMap = () => {
    let _,name = this.state.user.name.split(' ');
    let first = name[0];
    let last = name[1];

    let dateTime = this.getCurrentTime()
    let journeyId = first + last + dateTime[0];
    let formattedDateTime = dateTime[1];
    console.log(formattedDateTime);
    let mapPath = '/makejourney/' + journeyId;
    post("/api/journey", { creator_id: this.state.user, journey_id: journeyId, crumbs: [] }).then((comment) => {
        // display this comment on the screen
        console.log(comment);
      });
    navigate(mapPath);
}

formatDateTime = () => {
    let linkedJourneys = []
    get('/api/journeys').then((journeys) => {
        this.setState({journeys: journeys});
        for (let i = 0; i < this.state.journeys.length; i++) {
            let linkName = this.state.journeys[i].dateTime;
            let mapLink = '/makejourney/' + this.state.journeys[i].journey_id;
            let linkString = `<Link to=${mapLink} > ${linkName} </Link>`;
            linkedJourneys.push(linkString);
            
        }
        return linkedJourneys;
    });
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
        <div>
            {this.formatDateTime()}
        </div>

            {/* <input type="file" accept="image/*" onChange={this.handleImageUpload} multiple = "false" /> */}
        

        </>
      );
    }
}
  


export default Profile;