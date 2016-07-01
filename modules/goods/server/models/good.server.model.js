'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Good Schema
 */
var GoodSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    required: 'Price cannot be blank'
  },
  created: {
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }
});

mongoose.model('Good', GoodSchema);
