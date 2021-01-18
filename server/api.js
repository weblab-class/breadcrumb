/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const JourneyPost = require("./models/journeyPost");
const CrumbEntry = require("./models/crumbEntry");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/journey", auth.ensureLoggedIn, (req, res) => {
  const newJourney = new JourneyPost({
    creator_id: req.user._id,
    journey_id: req.body.journey_id,
    // thumbnail: req.body.thumbnail,
    crumbs: req.body.crumbs,  
    dateTime: req.body.dateTime, 
  });

  newJourney.save().then((journey) => res.send(journey));
});

router.get("/journeycrumbs", auth.ensureLoggedIn, (req, res) => {
  CrumbEntry.find({
    journey_id: req.body.journey_id,
  }).then((journey) => res.send(journey));
});

router.post("/journeyupdate", auth.ensureLoggedIn, (req, res) => {
  JourneyPost.findOne({'journey_id': req.body.journey_id}).then((journey) => {
    journey.crumbs = req.body.crumbs;
    journey.save();
    res.send(journey);
  });
});

router.get("/journeys", (req, res) => {
  JourneyPost.find({
    creator_id: req.user._id,
  }).then((journeys) => res.send(journeys));
});

router.post("/crumb", auth.ensureLoggedIn, (req, res) => {
  const newCrumb = new CrumbEntry({
    creator_id: req.user._id,
    journey_id: req.body.journey_id,
    crumb_id: req.body.crumb_id,
    title: req.body.title,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  newCrumb.save().then((crumb) => res.send(crumb));
});

router.get("/user", (req, res) => {
  console.log("getting user...");
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/user/bio", (req, res) => {
  console.log(req.body);
  User.findById(req.user._id).then((user) => {
    user.bio = req.body.content;
    user.save();
    res.send(user);
  });
});

router.post("/user/location", (req, res) => {
  console.log(req.body);
  User.findById(req.user._id).then((user) => {
    user.location = req.body.content;
    user.save();
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
