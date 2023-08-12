// Create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');
var Comment = require('./models/comment');
var Token = require('./models/token');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Path: /comments
// Get all comments
router.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
});

// Path: /comments
// Create a new comment
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var newComment = new Comment({