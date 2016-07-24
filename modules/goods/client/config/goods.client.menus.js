(function () {
  'use strict';

  angular
    .module('goods')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Goods',
      state: 'goods',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'goods', {
      title: 'Create Goods',
      state: 'goods.create',
      roles: ['user']
    });

  }
}());
