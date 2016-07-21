'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Good = mongoose.model('Good'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Show the current good
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var good = req.good ? req.good.toJSON() : {};

  // Add a custom field to the Good, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Good model.
  good.isCurrentUserOwner = !!(req.user && good.user && good.user._id.toString() === req.user._id.toString());

  res.json(good);
};


/**
 * Good middleware
 */
exports.goodByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Good is invalid'
    });
  }

  Good.findById(id).populate('user', 'displayName').exec(function (err, good) {
    if (err) {
      return next(err);
    } else if (!good) {
      return res.status(404).send({
        message: 'No good with that identifier has been found'
      });
    }
    req.good = good;
    next();
  });
};
