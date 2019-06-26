const remote = require('electron').remote

const copyMenuTemplate = [
  {
    label: 'Copy',
    role: 'copy'
  }
]

const pasteMenuTemplate = [
  {
    label: 'Paste',
    role: 'paste'
  },
  { type: 'separator' },
  {
    label: 'Select All',
    role: 'selectall'
  }
]

const reloadMenuTemplate = [
  {
    label: 'Reload Page',
    role: 'reload'
  }
]

const editorMenuTemplate = [
  {
    label: 'Cut',
    role: 'cut'
  },
  {
    label: 'Copy',
    role: 'copy'
  },
  {
    label: 'Paste',
    role: 'paste'
  },
  { type: 'separator' },
  {
    label: 'Select All',
    role: 'selectall'
  }
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
