import "../../utilities.css";
import "./MakeJourney.css";

import * as React from 'react';
import {Component, useState} from 'react';
import {render} from 'react-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJ1ZHlwYWludGVyIiwiYSI6ImNranl5aG5veTAyYzcyb3BrYXY4ZXRudmsifQ.LfDsBUsS5yryoXBqEYbE7Q';

class MakeMapGL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 4,
        bearing: 0,
        pitch: 0
      }
    };
  }

  componentDidMount() {
      document.title = "Make A Journey";
  }

  render() {

    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
         
      </MapGL>
    );
  }
}

export default MakeMapGL;

