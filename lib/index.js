"use strict";

require("core-js/modules/es6.array.map");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lodash2 = _interopRequireDefault(require("lodash.defaults"));

var _lodash3 = _interopRequireDefault(require("lodash.isempty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var remote = require('electron').remote;

var Menu = remote.require('electron').Menu; // defining default menu templates **********************************


var copyMenuTemplate = [{
  role: 'copy'
}];
var pasteMenuTemplate = [{
  role: 'paste'
}, {
  type: 'separator'
}, {
  role: 'selectall'
}];
var reloadMenuTemplate = [{
  role: 'reload'
}];
var editorMenuTemplate = [{
  role: 'cut'
}, {
  role: 'copy'
}, {
  role: 'paste'
}, {
  type: 'separator'
}, {
  role: 'selectall'
}]; // template when spell check can't find suggestions

var noSuggestionsTemplate = {
  exists: true,
  menuItems: [{
    label: 'No Suggestions',
    enabled: false
  }] // individual suggestion menu item prototype

};

var SuggestionMenuItem = function SuggestionMenuItem(correction) {
  _classCallCheck(this, SuggestionMenuItem);

  if (typeof correction !== 'string') {
    throw new Error('SuggestionMenuItem: parameter must be a string');
  }

  this.item = {
    label: correction,
    click: function click() {
      remote.getCurrentWebContents().replaceMisspelling(correction);
    }
  };
}; // prefix or suffix menu template


var MenuTemplate = function MenuTemplate(list) {
  _classCallCheck(this, MenuTemplate);

  this.menu = {
    exists: true,
    menuItems: list
  };
};

var menuTemplates = {
  copy: copyMenuTemplate,
  editor: editorMenuTemplate,
  noSuggest: noSuggestionsTemplate,
  paste: pasteMenuTemplate,
  reload: reloadMenuTemplate,
  SuggestionMenuItem: SuggestionMenuItem,
  MenuTemplate: MenuTemplate
};

var BuildContextMenu = function BuildContextMenu() {
  var menuTemplate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : editorMenuTemplate;
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
  var template = (0, _lodash["default"])(menuTemplate); // defaults for prefix and suffix menu objects
  // in case no suffix or prefix items are passed into constructor

  prefix = (0, _lodash2["default"])({}, prefix, {
    exists: false,
    menuItems: []
  });
  suffix = (0, _lodash2["default"])({}, suffix, {
    exists: false,
    menuItems: []
  }); // attach prefix items to menu template

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
  } // attach suffix items to menu template


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
  BuildContextMenu: BuildContextMenu,
  menuTemplates: menuTemplates
};