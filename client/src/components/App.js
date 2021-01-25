import "../utilities.css";

import { Link, Location, Router, navigate } from "@reach/router";
import React, { Component } from "react";
import { get, post } from "../utilities";

import Landing from "./pages/Landing.js";
import MakeJourney from "./pages/MakeJourney";
import NavBar from "./modules/NavBar";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import { socket } from "../client-socket.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  afterLogin = () => {
    navigate("/profile/:userId");
  };

  render() {
    console.log(this.state);
    console.log("APP JS CURRENT URL PATH", window.location.href);
    return (
      <>
        <Location>
          {(locationProps) => (
            <NavBar
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              location={locationProps.location}
            />
          )}
        </Location>
        <Router>
          <Landing
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Profile path="/profile/:userId" userId={this.state.userId} />
          <MakeJourney path="/journey/:journeyId" userId={this.state.userId} />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
