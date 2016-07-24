(function () {
  'use strict';

  describe('Goods Route Tests', function () {

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    describe('Goods Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('goods');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/goods');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('Create Route', function () {
        var createstate;
        beforeEach(inject(function ($state) {
          createstate = $state.get('goods.create');
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

      });

    });
  });
}());
