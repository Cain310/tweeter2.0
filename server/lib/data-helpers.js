"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweeter").insertOne(newTweet, callback);
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      db.collection("tweeter").find().toArray(function (err, tweets) {
        callback(null, tweets)
      })
    },
    retrieveUser: function (email, callback) {
      // console.log("email", email)
      db.collection("tweeterUsers").findOne({ email: email }).then(function (user) {
        console.log("users", user)
        callback(user)
      })
    },
    saveUser: function (user, callback) {
      db.collection("tweeterUsers").insertOne(user, callback);
    }
  }
};
