import "./JourneyCard.css";

import React, { Component } from "react";

import { Link } from "@reach/router";
import { post } from "../../utilities";

/**
 * JourneyCard is a component for creating the profile posts thumbnail cards
 *
 * Proptypes
 * @param {string} _id of the journey
 * @param {string} journey link
 * @param {string} date time of journey creation
 * @oaram {boolean} delete if the user is deleting journeys
 * @param {string} user's journey number
 */
class JourneyCard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

startDelete = () => {
  post('/api/deletejourney', {journey_id: this.props.journeyId});
  window. location.reload();
}

  render() {
    return (
      <div className="Card-container">
        <div className="deleteButton">
          <button className="minus radius" onClick={this.startDelete}>
            {" "}
          </button>
          </div>
        <Link to={this.props.journeyLink} className="u-link u-bold">
          {"My Journey #" + this.props.journeyIndex}
        </Link>
        <p className="Card-storyContent">{this.props.dateTime.split(" ").slice(0, 3).join(" ")}</p>
      </div>
    );
  }
}

export default JourneyCard;
