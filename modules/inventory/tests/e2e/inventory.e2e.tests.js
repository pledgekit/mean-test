'use strict';

describe('Inventory E2E Tests:', function () {
  describe('Test home page', function () {

    beforeEach(function() {
      browser.get('http://localhost:3001/');
    });

    it('Should show link to inventory in the nav bar', function () {
      // There should be a link for inventory.create ui route
      expect(element(by.css('nav')).element(by.uiSref('inventory.create')).isPresent()).toBe(true);
    });

  });
});
