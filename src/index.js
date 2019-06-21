const Menu = remote.require('electron').Menu

const cloneDeep = require('lodash.clonedeep')
const defaults = require('lodash.defaults')
const isEmpty = require('lodash.isempty')

const copyMenuTemplate = [
  {
    label: 'Copy',
    role: 'copy'
  },
  {
    type: 'separator'
  },
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
  }
]

const buildContextMenu = function(prefix, suffix, menuType='copy') {
  /*
    builds context menu in the clicked area in browserwindow of electron app

    Args:
      prefix: Object - contains any prefix options required in the ctx menu
      suffix: Object - contains and suffix options required in the ctx menu
      menuType: String - select between copy menu and editor menu
    Returns:
      Menu: Electron Menu
    Examples:
      for just simple menus no prefis or suffix in either menus
        Copy: buildContextMenu()
        Editor: buildContextMenu({}, {}, 'editor')
      for menus with prefixs and or suffixes
        Copy: buildContextMenu(prefix, suffix)
        Editor: buildContextMenu({}, suffix, 'editor') - no prefix, only suffix
      
  */

  let template = []

  prefix = defaults({}, prefix, {
    exists: false,
    menuItems: []
  })

  suffix = defaults({}, suffix, {
    exists: false,
    menuItems: []
  })

  // deepClone makes sure the object is completely cleared and prevents
  // redundent or repeated copies of the menu
  if (menuType == 'copy') {
    // if click not in editable area, can't use cut or paste, only open copy menu
    template = cloneDeep(copyMenuTemplate)
  } else {
    template = cloneDeep(editorMenuTemplate)
  }

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

  if (suffix.exists) {
    const suffixMenu = suffix.menuItems
    if (!isEmpty(suffixMenu)) {
      template.push({type: 'separator'})
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

module.exports = buildContextMenu
