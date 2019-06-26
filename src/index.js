import { templates } from './menuTemplates'
import { BuildContextMenu } from './buildContextMenu'

const buildMenus = function (editable, spellChecker) {
  let ctxMenu
  if (!editable) {
    // if right click in uneditable area
    if (window.getSelection().toString() === '') {
      // if no text is selected
      ctxMenu = new BuildContextMenu(templates.reload)
    } else {
      // if text is selected
      ctxMenu = new BuildContextMenu(templates.copy)
    }
  } else {
    // if right click in editable textarea
    if (window.getSelection().toString() === '') {
      // no text is selected in editable textarea
      ctxMenu = new BuildContextMenu(templates.paste)
    } else {
      // some text is selected in editable textarea
      const selection = window.getSelection().toString()
      if (!spellChecker.isMisspelled(selection)) {
        // selected word is spelled correctly
        ctxMenu = new BuildContextMenu(templates.editor)
      } else {
        // selected word is misspelled
        let suggestions = spellChecker.getCorrectionsForMisspelling(selection)
        if (suggestions.length === 0) {
          // no suggestions foing in dictionary
          ctxMenu = new BuildContextMenu(templates.editor, templates.noSuggest)
        } else {
          // suggestions were found
          suggestions = suggestions.slice(0, 3)
          // build list of suggestion menu items with their click functions
          const suggestedItemList = suggestions.map((suggestion) => {
            let menuItem = new templates.SuggestionMenuItem(suggestion)
            return menuItem.item
          })
          // build suggestions template object and pass to BuildContextMenu as prefix
          const suggestedMenu = new templates.SuggestionsMenuTemplate(suggestedItemList)
          ctxMenu = new BuildContextMenu(templates.editor, suggestedMenu.menu)
        }
      }
    }
  }

  return ctxMenu
}

export { buildMenus }
