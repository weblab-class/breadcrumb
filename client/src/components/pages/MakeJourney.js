import "../../utilities.css";
import "./MakeJourney.css";

import * as React from 'react';
import {Component, useState} from 'react';
import {render} from 'react-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';

const MAPBOX_TOKEN = "pk.eyJ1IjoidHJ1ZHlwYWludGVyIiwiYSI6ImNranl5aG5veTAyYzcyb3BrYXY4ZXRudmsifQ.LfDsBUsS5yryoXBqEYbE7Q";

const TEST_CRUMBS = [
    {
        creator_id: "trudy",
        title: "sfo",
        description: "this is a test description",
        latitude: 37.6213,
        longitude: -122.3790,
        //TODO add photo support
      },
      {
        creator_id: "trudy",
        title: "second post",
        description: "this is a second test description",
        latitude: 37.5,
        longitude: -122.2,
        //TODO add photo support
      }
];

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
      selectedCrumb: null,
      crumbsList: TEST_CRUMBS,
    };
  }

  componentDidMount() {
      document.title = "Make A Journey";
  }

  render() {
    
    const zoomAdjustedSize = {
        height: `${6 * this.state.viewport.zoom}px`,
        width: `${6 * this.state.viewport.zoom}px`,
    }

    const zoomAdjustedOffsetLeft = `${3 * this.state.viewport.zoom}`;

    const showAddMarkerPopup = (event) => {
        event.preventDefault();
        const [ longitude, latitude ] = event.lngLat;
        console.log(longitude, latitude)
    };

    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onDblClick={showAddMarkerPopup}
      >
        {this.state.crumbsList.map(crumb => (
            <Marker
                key={crumb.title}
                latitude={crumb.latitude}
                longitude={crumb.longitude}
            >
                <button className="marker" 
                    style={zoomAdjustedSize}

                    onClick={event => {
                        event.preventDefault();
                        console.log("CLICKED CRUMB");
                        console.log(crumb);
                        this.setState({
                            selectedCrumb: crumb,
                        })
                        console.log(this.state.selectedCrumb);
                        
                    }}>

                    <img src="crumb_icon.png"></img>
                </button>
            </Marker>
            
        ))}

        {this.state.selectedCrumb ? (
            <Popup
                latitude={this.state.selectedCrumb.latitude}
                longitude={this.state.selectedCrumb.longitude}
                onClose={() => {
                    this.setState({
                        selectedCrumb: null,
                    });}}>
                <div >
                    <h1 className="popup-title">{this.state.selectedCrumb.title}</h1>
                    {this.state.selectedCrumb.description}
                </div>
            </Popup>
        ) : null
        }

      </MapGL>
    );
  }
}

export default MakeMapGL;

