(function () {
  'use-strict';

  angular
    .module('goods.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Goods state routing
    $stateProvider
      .state('goods', {
        abstract: true,
        url: '/goods',
        template: '<ui-view/>'
      })
      .state('goods.create', {
        abstract: false,
        url: '/create'
      });
  }

}());
