const remote = require('electron').remote

const copyMenuTemplate = [
  { role: 'copy' }
]

const pasteMenuTemplate = [
  { role: 'paste' },
  { type: 'separator' },
  { role: 'selectall' }
]

const reloadMenuTemplate = [
  { role: 'reload' }
]

const editorMenuTemplate = [
  { role: 'cut' },
  { role: 'copy' },
  { role: 'paste' },
  { type: 'separator' },
  { role: 'selectall' }
]

// template when spell check can't find suggestions
const noSuggestionsTemplate = {
  exists: true,
  menuItems: [
    {
      label: 'No Suggestions',
      enabled: false
    }
  ]
}

class SuggestionMenuItem {
  constructor (correction) {
    this.item = {
      label: correction,
      click: function () {
        remote.getCurrentWebContents().replaceMisspelling(correction)
      }
    }
  }
}

class SuggestionsMenuTemplate {
  constructor (list) {
    this.menu = {
      exists: true,
      menuItems: list
    }
  }
}

const templates = {
  copy: copyMenuTemplate,
  editor: editorMenuTemplate,
  noSuggest: noSuggestionsTemplate,
  paste: pasteMenuTemplate,
  reload: reloadMenuTemplate,
  SuggestionMenuItem: SuggestionMenuItem,
  SuggestionsMenuTemplate: SuggestionsMenuTemplate
}

export { templates }
