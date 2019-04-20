"use strict";
const PORT = 8080;
const userHelper = require("../lib/util/user-helper")
const express = require('express');
const usersRoutes = express.Router();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

// // app.use(
// //   cookieSession({
// //     name: "session",
// //     keys: ["key1s", "key2s"]
// //   })
// // );

usersRoutes.use(bodyParser.urlencoded({ extended: true }));

module.exports = function (DataHelpers) {

  usersRoutes.get("/login", (req, res) => {
    const user = DataHelpers.retrieveUser(req.params.email, function (data) {
      console.log(data)
    });
    if (user) {
      req.session.userId = user.id;
      res.redirect("/");
    } else {
      res.status(400).send("THOU shalt not pass");
    }
  });

  // usersRoutes.post("/login", (req, res) => {
  //   if (!req.body.email || !req.body) {
  //     res.status(400).json({ error: 'invalid request: no data in POST body' });
  //     return;
  //   }

  //   DataHelpers.saveTweet(tweet, (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.status(201).send();
  //     }
  //   });
  // });

  return usersRoutes;
}
