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

// functions for image uploads
const { uploadImagePromise, deleteImagePromise, downloadImagePromise } = require("./storageTalk");

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
    crumbs: req.body.crumbs,
    dateTime: req.body.dateTime,
  });

  newJourney.save().then((journey) => res.send(journey));
});

// DELETE A JOURNEY OBJECT AND CRUMBS ASSOCIATED WITH IT
router.post("/deletejourney", auth.ensureLoggedIn, (req, res) => {
  JourneyPost.deleteOne({ journey_id: req.body.journey_id }).then((response) => {});
  CrumbEntry.deleteMany({ journey_id: req.body.journey_id }).then((response) => {});
});

router.get("/journeycrumbs", auth.ensureLoggedIn, (req, res) => {
  CrumbEntry.find({
    journey_id: req.query.journey_id,
  }).then((journey) => {
    res.send(journey);
  });
});

router.get("/crumbimage", auth.ensureLoggedIn, (req, res) => {
  downloadImagePromise(req.query.image_name)
    .catch((err) => "Err: could not find image")
    .then((images) => {
      res.send({ img: images });
    })
    .catch((err) => {
      res.status(500).send({
        message: "unknown error",
      });
    });
});

router.post("/journeyupdate", auth.ensureLoggedIn, (req, res) => {
  JourneyPost.findOne({ journey_id: req.body.journey_id }).then((journey) => {
    journey.crumbs = req.body.crumbs;
    journey.save();
    res.send(journey);
  });
});

router.get("/journeytitle", auth.ensureLoggedIn, (req, res) => {
  JourneyPost.findOne({ journey_id: req.query.journey_id }).then((journey) => {
    res.send(journey);
  });
});

router.post("/journeytitle", auth.ensureLoggedIn, (req, res) => {
  JourneyPost.findOne({ journey_id: req.body.journey_id }).then((journey) => {
    journey.journey_title = req.body.new_title;
    journey.save();
    res.send(journey);
  });
});

router.get("/journeys", auth.ensureLoggedIn, (req, res) => {
  JourneyPost.find({
    creator_id: req.query.userid,
  }).then((journeys) => {
    res.send(journeys);
  });
});

// NEW CRUMB CREATION ON EVERY FORM SUBMISSION
router.post("/crumb", auth.ensureLoggedIn, (req, res) => {
  if (typeof req.body.image_name !== "string") {
    throw new Error(
      "Can only handle images encoded as strings. Got type: " + typeof req.body.image_name
    );
  }

  if (req.body.image_name == "none") {
    const newCrumb = new CrumbEntry({
      creator_id: req.body.creator_id,
      journey_id: req.body.journey_id,
      crumb_id: req.body.crumb_id,
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      image_name: null,
    });
    newCrumb.save().then((crumb) => res.send(crumb));
  } else {
    uploadImagePromise(req.body.image_name).then((imageName) => {
      const newCrumb = new CrumbEntry({
        creator_id: req.body.creator_id,
        journey_id: req.body.journey_id,
        crumb_id: req.body.crumb_id,
        title: req.body.title,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image_name: imageName,
      });
      newCrumb.save().then((crumb) => res.send(crumb));
    });
  }
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
