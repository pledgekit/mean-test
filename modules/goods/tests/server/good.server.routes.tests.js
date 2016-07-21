'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Good = mongoose.model('Good'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  good;

/**
 * Good routes tests
 */
describe('Good CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new good
    user.save(function () {
      good = {
        name: 'Good name',
        description: 'this is a nice good',
        price: 1.00,
        donor: {
          firstName: 'Johnny',
          lastName: 'Appleseed',
          email: 'japplesee@gmail.com',
          receiptDate: '2016-01-01'
        },
        categories: ['men', 'women'],
        notes: 'these are notes',
        created: {
          user: user
        }
      };

      done();
    });
  });

  it('should be able to get a single good if signed in', function (done) {
    // Create new good model instance
    good.user = user;
    var goodObj = new Good(good);

    // Save the good
    goodObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user.id;

          // Save a new good
          agent.post('/api/goods')
            .send(good)
            .expect(200)
            .end(function (goodSaveErr, goodSaveRes) {
              // Handle good save error
              if (goodSaveErr) {
                return done(goodSaveErr);
              }

              // Get the good
              agent.get('/api/goods/' + goodSaveRes.body._id)
                .expect(200)
                .end(function (goodInfoErr, goodInfoRes) {
                  // Handle good error
                  if (goodInfoErr) {
                    return done(goodInfoErr);
                  }

                  // Set assertions
                  (goodInfoRes.body._id).should.equal(goodSaveRes.body._id);
                  (goodInfoRes.body.name).should.equal(good.name);

                  // Call the assertion callback
                  done();
                });
            });
        });
    });
  });


  afterEach(function (done) {
    User.remove().exec(function () {
      Good.remove().exec(done);
    });
  });
});
