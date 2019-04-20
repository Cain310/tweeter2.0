"use strict";
const PORT = 8080;
const userHelper = require("../lib/util/user-helper")
const express = require('express');
const usersRoutes = express.Router();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

usersRoutes.use(
  cookieSession({
    name: "session",
    keys: ["key1s", "key2s"]
  })
);

usersRoutes.use(bodyParser.urlencoded({ extended: true }));

module.exports = function (DataHelpers) {

  usersRoutes.post("/login", (req, res) => {
    DataHelpers.retrieveUser(req.body.email, function (user) {
      console.log("retrievedUser", user)
      if (user) {
        req.session["userID"] = user["_id"];
        res.redirect("/");
      } else {
        res.status(400).send("THOU shalt not pass");
      }
    });
  });

  usersRoutes.post("/", (req, res) => {
    console.log("registerUser")
    if (!req.body.email || !req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    DataHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("Success")
        res.status(201).send();
      }
    });
  });
  return usersRoutes;
}
