import "./JourneyCard.css";

import React, { Component } from "react";

import { Link } from "@reach/router";

/**
 * JourneyCard is a component for creating the profile posts thumbnail cards
 *
 * Proptypes
 * @param {string} _id of the journey
 * @param {string} journey link
 * @param {string} date time of journey creation
 * @param {string} user's journey number
 */
class JourneyCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="Card-container">
        <Link to={this.props.journeyLink} className="u-link u-bold">
          {"My Journey #" + this.props.journeyIndex}
        </Link>
        <p className="Card-storyContent">{this.props.dateTime.split(" ").slice(0, 3).join(" ")}</p>
      </div>
    );
  }
}

export default JourneyCard;
