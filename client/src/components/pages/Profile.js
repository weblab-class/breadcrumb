import "../../utilities.css";
import "./Profile.css";

import { Link, Router, navigate } from "@reach/router";
import React, { Component } from "react";
import { get, post } from "../../utilities";

import { GoogleLogout } from "react-google-login";
import JourneyCard from "../modules/JourneyCard.js";
import MakeJourney from "./MakeJourney";
import { render } from "react-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      journeys: undefined,
      delete: false,
    };

    console.log("delete is" + this.state.delete);

    this.journeyNum = 0;
  }

  componentDidMount() {
    document.title = "Profile Page";
    console.log("mounting!");
    get(`/api/whoami`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    this.loadJourneys();
  }

  //   componentDidUpdate(prevState) {
  //     if (prevState.journeys !== this.state.journeys) {
  //       this.loadJourneys();
  //     }
  //   }

  loadJourneys = () => {
    get("/api/journeys", { userid: this.props.userId }).then(async (journeys) => {
      this.journeyNum = await journeys.length;
      this.setState({ journeys: journeys });
    });
  };
  getCurrentTime = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let systemTime = new Date();
    let month = systemTime.getMonth();
    let day = systemTime.getDate();
    let year = systemTime.getFullYear();
    let hours = systemTime.getHours();
    let minutes = systemTime.getMinutes();
    let seconds = systemTime.getSeconds();
    let mili = systemTime.getMilliseconds();
    let fulltime =
      month.toString() +
      day.toString() +
      year.toString() +
      hours.toString() +
      minutes.toString() +
      seconds.toString() +
      mili.toString();
    let formattedDateTime =
      monthNames[month] +
      " " +
      day.toString() +
      ", " +
      year.toString() +
      " " +
      hours.toString() +
      ":" +
      minutes.toString() +
      ":" +
      seconds.toString() +
      ":" +
      mili.toString();

    return [fulltime, formattedDateTime];
  };

  makeNewMap = () => {
    let _,
      name = this.state.user.name.split(" ");
    let first = name[0];
    let last = name[1];

    let dateTime = this.getCurrentTime();
    let journeyId = first + last + dateTime[0];
    let formattedDateTime = dateTime[1];
    console.log(formattedDateTime);
    let mapPath = "/journey/" + journeyId;
    post("/api/journey", {
      creator_id: this.state.user,
      journey_id: journeyId,
      crumbs: [],
      dateTime: formattedDateTime,
    }).then((comment) => {
      // display this comment on the screen
      console.log(comment);
    });
    navigate(mapPath);
  };

  formatDateTime = (journey) => {
    if (journey && journey.dateTime) {
      let linkName = journey.dateTime;
      let mapLink = "/journey/" + journey.journey_id;
      let linkString = <Link to={`${mapLink}`}> {linkName} </Link>;
      return linkString;
    }
  };

  startDelete = () => {
    this.setState({ delete: !this.state.delete });
  };

  render() {
    if (!this.state.user) {
      return <h3 className="warning"> </h3>;
    }
    return (
      <>
        <div className="journeyButton">
          <button className="plus radius" onClick={this.makeNewMap}>
            {" "}
          </button>
          {/* <button className="minus radius" onClick={this.startDelete}>
            {" "}
          </button> */}
        </div>
        <div className="infoContainer">
          <h1 className="profileName">{this.state.user.name}</h1>
          <h3 className="journeyNumber">{this.journeyNum} journeys</h3>
          {this.state.delete && this.state.journeys ? (
            <h3 className="deleteMessage">
              Click the journey you would like to delete. Click the minus button again to stop
              deleting.
            </h3>
          ) : (
            console.log("done deleting")
          )}
        </div>

        {this.state.journeys && this.state.journeys.length > 0 ? (
          <div className="flex-container">
            {this.state.journeys
              .slice(0)
              .reverse()
              .map((journey, index, array) => (
                <JourneyCard
                  journeyId={journey.journey_id}
                  journeyLink={this.formatDateTime(journey).props.to}
                  dateTime={journey.dateTime}
                  delete={this.state.delete}
                  journeyIndex={array.length - index}
                />
              ))}
          </div>
        ) : this.state.journeys === undefined ? (
          <div>
            <h3 className="warning">Loading!</h3>
          </div>
        ) : (
          <div>
            <h3 className="warning">
              No journeys yet! Click the plus button to create your first one!
            </h3>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
