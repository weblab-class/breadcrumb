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

    document.title = "Make a Journey";

    const body = {
      journey_id: this.props.journeyId,
    };
    get("/api/journeycrumbs", body).then((crumbObjs) => {
      crumbObjs.map((crumb) => {
        this.setState({
          crumbsList: this.state.crumbsList.concat(crumb),
          crumbIdList: this.state.crumbIdList.concat(crumb.crumb_id),
          sideBarReady: true,
        });
      });
    });
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
      event.preventDefault();

      this.setState({
        addNewEntry: true,
        newEntryLat: event.lngLat[1],
        newEntryLon: event.lngLat[0],
      });
    };
    const finishButtonClicked = () => {
      const profilePath = "/profile/" + this.props.userId;
      navigate(profilePath);
    };

    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...this.state.viewport}
          width="100vw"
          height="110vh"
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
                    viewport: { latitude: crumb.latitude, longitude: crumb.longitude, zoom: 5 },
                  });

                  get("/api/crumbimage", { image_name: crumb.image_name }).then((image) => {
                    console.log("received image");

                    if (image.img === "Err: could not find image") {
                      this.setState({ selectedCrumbImage: null });
                    } else {
                      this.setState({ selectedCrumbImage: image.img });
                    }
                  });
                }}
              ></button>
            </Marker>
          ))}

          {/* 2️⃣ CHECK FOR CRUMB CLICKED */}
          {this.state.selectedCrumb ? (
            <Popup
              latitude={this.state.selectedCrumb.latitude}
              longitude={this.state.selectedCrumb.longitude}
              onClose={() => {
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
                    this.setState({
                      crumbsList: this.state.crumbsList.concat(crumb),
                      crumbIdList: this.state.crumbIdList.concat(crumb.crumb_id),
                      addNewEntry: null,
                    });

                    const body = {
                      journey_id: this.props.journeyId,
                      crumbs: this.state.crumbIdList,
                    };
                    post("/api/journeyupdate", body);
                  }}
                />
              </div>
            </Popup>
          ) : null}
        </MapGL>

        {/* 4️⃣ HEADER SECTION */}

        <div className="header">
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
