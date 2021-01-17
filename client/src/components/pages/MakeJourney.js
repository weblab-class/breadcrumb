import "../../utilities.css";
import "./MakeJourney.css";

import * as React from 'react';
import {Component, useState} from 'react';
import {render} from 'react-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MakeMapGL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 8,
        bearing: 0,
        pitch: 0
      },
      showPopup: true
    };
  }

  componentDidMount() {
      document.title = "Make A Journey";
  }

  render() {
    const {showPopup} = this.state;

    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {showPopup && <Popup
          latitude={37.8}
          longitude={-122.4}
          closeButton={true}
          closeOnClick={false}
          onClose={() => this.setState({showPopup: false})}
          anchor="top" 
          >
          <div class="popupmarker">You are here</div>
        </Popup>} 
      </MapGL>
    );
  }
}

export default MakeMapGL;

