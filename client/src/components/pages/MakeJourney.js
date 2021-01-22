import "../../utilities.css";
import "./MakeJourney.css";

import * as React from 'react';
import {Component, useState} from 'react';
import {render} from 'react-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';
import CrumbEntryForm from '../modules/CrumbEntryForm';
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";


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
      selectedCrumbImage: null,

      addNewEntry: null,
      newEntryLat: null,
      newEntryLon: null,

      crumbsList: [],
      crumbIdList: [],
    };
  }

  componentDidMount() {
      document.title = "Make A Journey";

        const body = {
            journey_id: this.props.journeyId
        }
        console.log(body);
      get("/api/journeycrumbs", body).then((crumbObjs) => {
        console.log("THESE ARE THE CRUMB OBJS RETURNED", crumbObjs);
        crumbObjs.map((crumb) => {
          this.setState({ 
              crumbsList: this.state.crumbsList.concat(crumb),
              crumbIdList: this.state.crumbIdList.concat(crumb.crumb_id)
             });
        });

      });     
  }

  render() {
    
    const zoomAdjustedSize = {
        height: `${6 * this.state.viewport.zoom}px`,
        width: `${6 * this.state.viewport.zoom}px`,
    }

    const showAddMarkerPopup = (event) => {
        event.preventDefault();

        this.setState({
            addNewEntry: true,
            newEntryLat: event.lngLat[1],
            newEntryLon: event.lngLat[0],
        });
        console.log(this.state);
        console.log(this.props);

    };

    const finishButtonClicked = () => {
        console.log("Finish button clicked");
        const body = {
            journey_id: this.props.journeyId,
            crumbs: this.state.crumbIdList,
        }
        console.log(body);
        post("/api/journeyupdate", body).then((update) => {
            // display this comment on the screen
            console.log(update);
        });

        const profilePath = "/profile/" + this.props.userId;
        navigate(profilePath);
    }

    return (
    // <div clasName="make-journey-border-outer">
    // <div clasName="make-journey-border-inner">
    <div>

      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onDblClick={showAddMarkerPopup}  
      >
            {/* 1️⃣ LOAD/GENERATE CRUMBS */}
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
                        this.setState({
                            selectedCrumb: crumb,
                            selectedCrumbImage: crumb.image_name,
                        })
                        console.log(crumb.image_name);
                        get("/api/crumbimage", {image_name: crumb.image_name})
                        .then(image => {
                            console.log("received image");
                            console.log(image);

                            if (image.img === "Err: could not find image"){
                                this.setState({ selectedCrumbImage: null });
                            } else {
                                this.setState({ selectedCrumbImage: image.img });
                            }
                        });
                    }}>

                    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/bread_1f35e.png"></img>
                </button>
            </Marker>
            
        ))}

            {/* 2️⃣ CHECK FOR CRUMB CLICKED */}
        {this.state.selectedCrumb ? (
            <Popup
                latitude={this.state.selectedCrumb.latitude}
                longitude={this.state.selectedCrumb.longitude}
                onClose={() => {this.setState({
                    selectedCrumb: null,
                    selectedCrumbImage: null,
                });}}>
                <div >
                    <h1 className="popup-title">{this.state.selectedCrumb.title}</h1>
                    {this.state.selectedCrumb.description}

                    {this.state.selectedCrumbImage ? (
                    <img className="popup-image" src={this.state.selectedCrumbImage}></img>
                    ): null}
                </div>
            </Popup>
        ) : null
        }

            {/* 3️⃣ CHECK FOR DOUBLE CLICK + NEW CRUMB ENTRY FORM */}
        {this.state.addNewEntry ? (
            <Popup
            latitude={this.state.newEntryLat}
            longitude={this.state.newEntryLon}
            closeOnClick={false}
            onClose={() => {this.setState({addNewEntry: null,});}}>
            <div >
                <CrumbEntryForm 
                latitude={this.state.newEntryLat}
                longitude={this.state.newEntryLon}
                journey_id={this.props.journeyId}
                user_id={this.props.userId}
                current_crumbs = {this.state.crumbsList}
                
                updateCrumbList={(crumb) => 
                {
                    this.setState({
                        crumbsList: this.state.crumbsList.concat(crumb),
                        crumbIdList: this.state.crumbIdList.concat(crumb.crumb_id),
                        addNewEntry: null
                    });
                }}
                />
            </div>
        </Popup>
        ) : null
        }

      </MapGL>

      {/* <div className="header">
        Double click to drop crumbs... */}
        <button className="finish-button" onClick={finishButtonClicked}>
            Finish
        </button>
    {/* </div> */}

    </div>
    );
  }
}

export default MakeMapGL;

