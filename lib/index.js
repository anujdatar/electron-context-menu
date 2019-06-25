"use strict";

require("core-js/modules/es6.array.map");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lodash2 = _interopRequireDefault(require("lodash.defaults"));

var _lodash3 = _interopRequireDefault(require("lodash.isempty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Menu = require('electron').Menu;

var copyMenuTemplate = [{
  label: 'Copy',
  role: 'copy'
}];
var pasteMenuTemplate = [{
  label: 'Paste',
  role: 'paste'
}, {
  type: 'separator'
}, {
  label: 'Select All',
  role: 'selectall'
}];
var reloadMenuTemplate = [{
  label: 'Reload Page',
  role: 'reload'
}];
var editorMenuTemplate = [{
  label: 'Cut',
  role: 'cut'
}, {
  label: 'Copy',
  role: 'copy'
}, {
  label: 'Paste',
  role: 'paste'
}, {
  type: 'separator'
}, {
  label: 'Select All',
  role: 'selectall'
}]; // template when spell check can't find suggestions

var noSuggestionsTemplate = {
  exists: true,
  menuItems: [{
    label: 'No Suggestions',
    enabled: false
  }]
};

var copyContextMenu = function copyContextMenu() {
  /*
    builds menu in the clicked area with just one option "copy"
    in the browserwindow of electron app
     Returns:
      Menu: Electron Menu
    Usage:
        copyContextMenu()
  */
  var template = (0, _lodash["default"])(copyMenuTemplate);
  return Menu.buildFromTemplate(template);
};

var pasteContextMenu = function pasteContextMenu() {
  /*
    builds menu in the clicked area with just "paste" and "selectAll"
    in the browserwindow of electron app
     Returns:
      Menu: Electron Menu
    Usage:
        pasteContextMenu()
  */
  var template = (0, _lodash["default"])(pasteMenuTemplate);
  return Menu.buildFromTemplate(template);
};

var reloadContextMenu = function reloadContextMenu() {
  /*
    builds menu in the clicked area with just one option "reload"
    in the browserwindow of electron app
     Returns:
      Menu: Electron Menu
    Usage:
        reloadContextMenu()
  */
  var template = (0, _lodash["default"])(reloadMenuTemplate);
  return Menu.buildFromTemplate(template);
};

var buildContextMenu = function buildContextMenu(prefix, suffix) {
  /*
    builds context menu in the clicked area in browserwindow of electron app
     Args:
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
  var template = (0, _lodash["default"])(editorMenuTemplate);
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
}; // menu object when spell check can't find suggestions


var noSuggestionsMenu = buildContextMenu(noSuggestionsTemplate);
module.exports = {
  buildContextMenu: buildContextMenu,
  copyContextMenu: copyContextMenu,
  pasteContextMenu: pasteContextMenu,
  reloadContextMenu: reloadContextMenu,
  noSuggestionsMenu: noSuggestionsMenu
};