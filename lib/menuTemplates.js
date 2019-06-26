"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templates = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var remote = require('electron').remote;

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
  }]
};

var SuggestionMenuItem = function SuggestionMenuItem(correction) {
  _classCallCheck(this, SuggestionMenuItem);

  this.item = {
    label: correction,
    click: function click() {
      remote.getCurrentWebContents().replaceMisspelling(correction);
    }
  };
};

var SuggestionsMenuTemplate = function SuggestionsMenuTemplate(list) {
  _classCallCheck(this, SuggestionsMenuTemplate);

  this.menu = {
    exists: true,
    menuItems: list
  };
};

var templates = {
  copy: copyMenuTemplate,
  editor: editorMenuTemplate,
  noSuggest: noSuggestionsTemplate,
  paste: pasteMenuTemplate,
  reload: reloadMenuTemplate,
  SuggestionMenuItem: SuggestionMenuItem,
  SuggestionsMenuTemplate: SuggestionsMenuTemplate
};
exports.templates = templates;