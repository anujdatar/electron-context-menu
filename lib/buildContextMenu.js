"use strict";

require("core-js/modules/es6.array.map");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lodash2 = _interopRequireDefault(require("lodash.defaults"));

var _lodash3 = _interopRequireDefault(require("lodash.isempty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var remote = require('electron').remote;

var Menu = remote.require('electron').Menu;

var test = [{
  role: 'reload'
}];

var BuildContextMenu = function BuildContextMenu() {
  var menuTemplate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : test;
  var prefix = arguments.length > 1 ? arguments[1] : undefined;
  var suffix = arguments.length > 2 ? arguments[2] : undefined;

  /*
    builds context menu in the clicked area in browserwindow of electron app
     Args:
      menuTemplate: Object - contains template for basic underlying menu
      prefix: Object - contains any prefix options required in the ctx menu
      suffix: Object - contains and suffix options required in the ctx menu
    Returns:
      Menu: Electron Menu
    Usage:
      for just simple menus no prefis or suffix in either menus
        buildContextMenu({}, {})
      for menus with prefixs and or suffixes
        buildContextMenu({}, suffix) - no prefix, only suffix
  */
  // deepClone makes sure the object is completely cleared and prevents
  // redundent or repeated copies of menu items
  var template = (0, _lodash["default"])(menuTemplate);
  prefix = (0, _lodash2["default"])({}, prefix, {
    exists: false,
    menuItems: []
  });
  suffix = (0, _lodash2["default"])({}, suffix, {
    exists: false,
    menuItems: []
  });

  if (prefix.exists) {
    var prefixMenu = prefix.menuItems;

    if (!(0, _lodash3["default"])(prefixMenu)) {
      template.unshift.apply(template, prefixMenu.map(function (item) {
        return {
          label: item.label,
          click: item.click
        };
      }).concat({
        type: 'separator'
      }));
    }
  }

  if (suffix.exists) {
    var suffixMenu = suffix.menuItems;

    if (!(0, _lodash3["default"])(suffixMenu)) {
      template.push({
        type: 'separator'
      });
      template.push.apply(template, suffixMenu.map(function (item) {
        return {
          label: item.label,
          click: item.click
        };
      }));
    }
  }

  return Menu.buildFromTemplate(template);
};

module.exports = {
  BuildContextMenu: BuildContextMenu
};