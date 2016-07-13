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
  donor: {
    firstName: {
      type: String,
      trim: true,
      default: '',
      required: 'Donor\'s first name cannot be blank'
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
      required: 'Donor\'s last name cannot be blank'
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    receiptDate: {
      type: Date
    }
  },
  categories: [
    {
      type: String,
      trim: true
    }
  ],
  notes: {
    type: String,
    default: '',
    trim: true
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
  },
  modified: {
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
