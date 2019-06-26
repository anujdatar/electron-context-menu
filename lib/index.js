"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildMenus = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _menuTemplates = require("./menuTemplates");

var _buildContextMenu = require("./buildContextMenu");

var buildMenus = function buildMenus(editable, spellChecker) {
  var ctxMenu;

  if (!editable) {
    // if right click in uneditable area
    if (window.getSelection().toString() === '') {
      // if no text is selected
      ctxMenu = (0, _buildContextMenu.BuildContextMenu)(_menuTemplates.templates.reload);
    } else {
      // if text is selected
      ctxMenu = (0, _buildContextMenu.BuildContextMenu)(_menuTemplates.templates.copy);
    }
  } else {
    // if right click in editable textarea
    if (window.getSelection().toString() === '') {
      // no text is selected in editable textarea
      ctxMenu = (0, _buildContextMenu.BuildContextMenu)(_menuTemplates.templates.paste);
    } else {
      // some text is selected in editable textarea
      var selection = window.getSelection().toString();

      if (!spellChecker.isMisspelled(selection)) {
        // selected word is spelled correctly
        ctxMenu = (0, _buildContextMenu.BuildContextMenu)(_menuTemplates.templates.editor);
      } else {
        // selected word is misspelled
        var suggestions = spellChecker.getCorrectionsForMisspelling(selection);

        if (suggestions.length === 0) {
          // no suggestions foing in dictionary
          ctxMenu = (0, _buildContextMenu.BuildContextMenu)(_menuTemplates.templates.editor, _menuTemplates.templates.noSuggest);
        } else {
          // suggestions were found
          suggestions = suggestions.slice(0, 3); // build list of suggestion menu items with their click functions

          var suggestedItemList = suggestions.map(function (suggestion) {
            var menuItem = new _menuTemplates.templates.SuggestionMenuItem(suggestion);
            return menuItem.item;
          }); // build suggestions template object and pass to BuildContextMenu as prefix

          var suggestedMenu = new _menuTemplates.templates.SuggestionsMenuTemplate(suggestedItemList);
          ctxMenu = (0, _buildContextMenu.BuildContextMenu)(_menuTemplates.templates.editor, suggestedMenu.menu);
        }
      }
    }
  }

  return ctxMenu;
};

exports.buildMenus = buildMenus;