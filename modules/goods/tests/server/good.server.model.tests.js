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

  /**
 * Unit tests
 */
describe('Good Model Unit Tests:', function () {

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      good = new Good({
        name: 'Good name',
        description: 'this is a nice good',
        price: 1.00,
        created: {
          user: user
        }
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return good.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      good.name = '';

      return good.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without a price', function (done) {
      good.price = '';

      return good.save(function (err) {
        should.exist(err);
        done();
      });
    });


  });

  afterEach(function (done) {
    Good.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
