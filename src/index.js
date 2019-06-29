import cloneDeep from 'lodash.clonedeep'
import defaults from 'lodash.defaults'
import isEmpty from 'lodash.isempty'

const remote = require('electron').remote
const Menu = remote.require('electron').Menu

// defining default menu templates **********************************
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

// individual suggestion menu item prototype
class SuggestionMenuItem {
  constructor (correction) {
    if (typeof correction !== 'string') {
      throw new Error('SuggestionMenuItem: parameter must be a string')
    }
    this.item = {
      label: correction,
      click: function () {
        remote.getCurrentWebContents().replaceMisspelling(correction)
      }
    }
  }
}

// prefix or suffix menu template
class MenuTemplate {
  constructor (list) {
    this.menu = {
      exists: true,
      menuItems: list
    }
  }
}

const menuTemplates = {
  copy: copyMenuTemplate,
  editor: editorMenuTemplate,
  noSuggest: noSuggestionsTemplate,
  paste: pasteMenuTemplate,
  reload: reloadMenuTemplate,
  SuggestionMenuItem: SuggestionMenuItem,
  MenuTemplate: MenuTemplate
}

const BuildContextMenu = function (menuTemplate = editorMenuTemplate, prefix, suffix) {
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
  let template = cloneDeep(menuTemplate)

  // defaults for prefix and suffix menu objects
  // in case no suffix or prefix items are passed into constructor
  prefix = defaults({}, prefix, {
    exists: false,
    menuItems: []
  })

  suffix = defaults({}, suffix, {
    exists: false,
    menuItems: []
  })

  // attach prefix items to menu template
  if (prefix.exists) {
    const prefixMenu = prefix.menuItems
    if (!isEmpty(prefixMenu)) {
      template.unshift.apply(template, prefixMenu.map((item) => {
        return {
          label: item.label,
          click: item.click
        }
      }).concat({
        type: 'separator'
      }))
    }
  }

  // attach suffix items to menu template
  if (suffix.exists) {
    const suffixMenu = suffix.menuItems
    if (!isEmpty(suffixMenu)) {
      template.push({ type: 'separator' })
      template.push.apply(template, suffixMenu.map((item) => {
        return {
          label: item.label,
          click: item.click
        }
      }))
    }
  }

  return Menu.buildFromTemplate(template)
}

module.exports = {
  BuildContextMenu,
  menuTemplates
}
