'use strict';

/**
 * Module dependencies
 */
var goodsPolicy = require('../policies/goods.server.policy'),
  goods = require('../controllers/goods.server.controller');

module.exports = function (app) {

  // Single good routes
  app.route('/api/goods/:goodId').all(goodsPolicy.isAllowed)
    .get(goods.read);

  // Finish by binding the good middleware
  app.param('goodId', goods.goodByID);
};
