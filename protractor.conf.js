'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js'],
  onPrepare: function () {
    require('protractor-uisref-locator')(protractor);
  }
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
