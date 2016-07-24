'use strict';

describe('Goods E2E Tests:', function () {
  describe('Test home page', function () {

    describe('Before login', function () {
      it('Should not show create goods link when not signed in', function () {
        browser.get('http://localhost:3001/');
        expect(element(by.uiSref('goods.create')).isPresent()).toBe(false);
      });
    });

    describe('With User Logged In', function () {

      var user = {
        firstName: 'Full',
        lastName: 'Name',
        displayName: 'Full Name',
        email: 'test@test.com',
        username: 'username',
        password: 'M3@n.jsI$Aw3$0m3'
      };

      var signup = function () {
        browser.get('http://localhost:3001/authentication/signup');
        // Enter FirstName
        element(by.model('vm.credentials.firstName')).sendKeys(user.firstName);
        // Enter LastName
        element(by.model('vm.credentials.lastName')).sendKeys(user.lastName);
        // Enter Email
        element(by.model('vm.credentials.email')).sendKeys(user.email);
        // Enter UserName
        element(by.model('vm.credentials.username')).sendKeys(user.username);
        // Enter Password
        element(by.model('vm.credentials.password')).sendKeys(user.password);
        // Click Submit button
        element(by.css('button[type="submit"]')).click();
      };

      var signout = function () {
        // Make sure user is signed out first
        browser.get('http://localhost:3001/authentication/signout');
        // Delete all cookies
        browser.driver.manage().deleteAllCookies();
      };

      beforeAll(function () {
        signup();
      });

      afterAll(function () {
        signout();
      });

      it('Should show create goods link when not signed in', function () {
        browser.get('http://localhost:3001/');
        var create = element(by.uiSref('goods.create'));
        expect(create.isPresent()).toBe(true);
        create.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/goods/create');
      });

    });

  });
});
