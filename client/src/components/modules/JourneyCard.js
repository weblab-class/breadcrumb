import "./JourneyCard.css";

import React, { Component } from "react";

import JourneyMenu from "./JourneyMenu";
import { Link } from "@reach/router";
import { post } from "../../utilities";

/**
 * JourneyCard is a component for creating the profile posts thumbnail cards
 *
 * Proptypes
 * @param {string} _id of the journey
 * @param {string} journey link
 * @param {string} date time of journey creation
 * @param {boolean} delete if the user is deleting journeys
 * @param {string} user's journey number
 */
class JourneyCard extends Component {
  constructor(props) {
    super(props);
  }

  startDelete = () => {
    post("/api/deletejourney", { journey_id: this.props.journeyId });
  };

  render() {
    return (
      <div className="Card-container">
        <div className="Card-menu">
          <JourneyMenu journeyId={this.props.journeyId} />
        </div>
        <div className="Card-content">
          {!this.props.journeyTitle ? (
            <Link to={this.props.journeyLink} className="u-link u-bold">
              {"My Journey #" + this.props.journeyIndex}
            </Link>
          ) : (
            <Link to={this.props.journeyLink} className="u-link u-bold">
              {this.props.journeyTitle}
            </Link>
          )}
          <p className="Card-storyContent">
            {this.props.dateTime.split(" ").slice(0, 3).join(" ")}
          </p>
        </div>
      </div>
    );
  }
}

export default JourneyCard;
