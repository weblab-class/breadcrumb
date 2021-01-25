import "../../utilities.css";
import "./MakeJourney.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { Component, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import React, { useCallback, useRef } from "react";
import { get, post } from "../../utilities";

import CrumbEntryForm from "../modules/CrumbEntryForm";
import Geocoder from "react-map-gl-geocoder";
import SideBar from "../modules/SideBar";
import { navigate } from "@reach/router";
import { render } from "react-dom";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHJ1ZHlwYWludGVyIiwiYSI6ImNranl5aG5veTAyYzcyb3BrYXY4ZXRudmsifQ.LfDsBUsS5yryoXBqEYbE7Q";

class MakeMapGL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 37.8283,
        longitude: -98.5795,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      },
      selectedCrumb: null,
      selectedCrumbImage: null,

      addNewEntry: null,
      newEntryLat: null,
      newEntryLon: null,

      crumbsList: [],
      crumbIdList: [],
      sideBarReady: null,
    };
  }

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();

    document.title = "Make A Journey";

    const body = {
      journey_id: this.props.journeyId,
    };
    console.log(body);
    get("/api/journeycrumbs", body).then((crumbObjs) => {
      console.log("THESE ARE THE CRUMB OBJS RETURNED", crumbObjs);
      crumbObjs.map((crumb) => {
        this.setState({
          crumbsList: this.state.crumbsList.concat(crumb),
          crumbIdList: this.state.crumbIdList.concat(crumb.crumb_id),
          sideBarReady: true,
        });
      });
    });

    console.log("INITIAL PROPS", this.props);
    console.log("INITIAL STATE", this.state);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  render() {
    const zoomAdjustedSize = {
      height: `${6 * this.state.viewport.zoom}px`,
      width: `${6 * this.state.viewport.zoom}px`,
    };
    const showAddMarkerPopup = (event) => {
      console.log("showing something");
      event.preventDefault();

      this.setState({
        addNewEntry: true,
        newEntryLat: event.lngLat[1],
        newEntryLon: event.lngLat[0],
      });
    };
    const finishButtonClicked = () => {
      console.log("Finish button clicked");

      const profilePath = "/profile/" + this.props.userId;
      navigate(profilePath);
    };
    const onDelete = () => {
      console.log("deleting!");
      console.log(this.selectedCrumb);
      post("/api/deletecrumb", this.selectedCrumb).then((update) => {
        // display this comment on the screen
        console.log(update);
      });
    };

    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...this.state.viewport}
          width="100vw"
          height="90vh"
          mapStyle="mapbox://styles/mapbox/light-v9"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onDblClick={showAddMarkerPopup}
        >
          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            value=""
            onSelect={showAddMarkerPopup}
            hideOnSelect={true}
            collapsed={true}
            clearAndBlurOnEsc={true}
            position="top-left"
            showLoader={false}
          />
          {/* 1️⃣ LOAD/GENERATE CRUMBS */}
          {this.state.crumbsList.map((crumb) => (
            <Marker key={crumb.title} latitude={crumb.latitude} longitude={crumb.longitude}>
              <button
                className="marker"
                style={zoomAdjustedSize}
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({
                    selectedCrumb: crumb,
                    selectedCrumbImage: crumb.image_name,
                  });

                  console.log(crumb.image_name);
                  get("/api/crumbimage", { image_name: crumb.image_name }).then((image) => {
                    console.log("received image");
                    console.log(image);

                    if (image.img === "Err: could not find image") {
                      this.setState({ selectedCrumbImage: null });
                    } else {
                      this.setState({ selectedCrumbImage: image.img });
                    }
                  });
                }}
              >
                {/* <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/bread_1f35e.png"></img> */}
              </button>
            </Marker>
          ))}

          {/* 2️⃣ CHECK FOR CRUMB CLICKED */}
          {this.state.selectedCrumb ? (
            <Popup
              latitude={this.state.selectedCrumb.latitude}
              longitude={this.state.selectedCrumb.longitude}
              onClose={() => {
                // console.log(this.state.selectedCrumb);
                this.setState({
                  selectedCrumb: null,
                  selectedCrumbImage: null,
                });
              }}
            >
              <div>
                <h1 className="popup-title">{this.state.selectedCrumb.title}</h1>
                {this.state.selectedCrumb.description}

                {this.state.selectedCrumbImage ? (
                  <img className="popup-image" src={this.state.selectedCrumbImage}></img>
                ) : null}
                {/* <br></br>
                <button
                  onClick={() => {
                    console.log("shit");
                    onDelete;
                  }}
                  className="create-button"
                >
                  Delete Entry
                </button> */}
              </div>
            </Popup>
          ) : null}

          {/* 3️⃣ CHECK FOR DOUBLE CLICK + NEW CRUMB ENTRY FORM */}
          {this.state.addNewEntry ? (
            <Popup
              latitude={this.state.newEntryLat}
              longitude={this.state.newEntryLon}
              closeOnClick={false}
              onClose={() => {
                this.setState({ addNewEntry: null });
              }}
            >
              <div>
                <CrumbEntryForm
                  latitude={this.state.newEntryLat}
                  longitude={this.state.newEntryLon}
                  journey_id={this.props.journeyId}
                  user_id={this.props.userId}
                  current_crumbs={this.state.crumbsList}
                  updateCrumbList={(crumb) => {
                    const body = {
                      journey_id: this.props.journeyId,
                      crumbs: this.state.crumbIdList,
                    };
                    console.log(body);
                    post("/api/journeyupdate", body).then((update) => {
                      // display this comment on the screen
                      console.log(update);
                    });

                    this.setState({
                      crumbsList: this.state.crumbsList.concat(crumb),
                      crumbIdList: this.state.crumbIdList.concat(crumb.crumb_id),
                      addNewEntry: null,
                    });
                  }}
                />
              </div>
            </Popup>
          ) : null}
        </MapGL>

        {/* 4️⃣ HEADER SECTION */}

        <div className="header">
          {/* {this.state.sideBarReady ? <SideBar crumbs={this.state.crumbsList} /> : null} */}

          <div className="instruction-label">Double click to drop crumbs.</div>
        </div>

        <button className="finish-button" onClick={finishButtonClicked}>
          Finish
        </button>
      </div>
    );
  }
}

export default MakeMapGL;
