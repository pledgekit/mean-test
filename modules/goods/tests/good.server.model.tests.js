'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Good = mongoose.model('Good');

/**
 * Globals
 */
var user,
  good;