const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

app.use(function (req, res, next) {

  if (numberOfRequestsForUser.user == undefined) {
    numberOfRequestsForUser.user = req.headers['user-id'];
    numberOfRequestsForUser.count = 1;
    next();
  }
  else if (numberOfRequestsForUser.user == req.headers['user-id'] && numberOfRequestsForUser.count <= 5) {
    numberOfRequestsForUser.count++;
    next();
  }
  else {
    res.status(404).json({ message: 'number of user exceeded' });
  }
})

let numberOfRequestsForUser = {};
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000)

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john', ar: numberOfRequestsForUser });
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;
// app.listen(5000, () => {
//   console.log(`listening on port ${5000}`)
// })