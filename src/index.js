import Menu from 'electron.Menu'

import cloneDeep from 'lodash.clonedeep'
import defaults from 'lodash.defaults'
import isEmpty from 'lodash.isempty'

const copyMenuTemplate = [
  {
    label: 'Copy',
    role: 'copy'
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

const reloadMenuTemplate = [
  {
    label: 'Reload Page',
    role: 'reload'
  }
]

const copyContextMenu = function () {
  /*
    builds menu in the clicked area with just one option "copy"
    in the browserwindow of electron app

    Returns:
      Menu: Electron Menu
    Usage:
        copyContextMenu()
  */
  let template = cloneDeep(copyMenuTemplate)

  return Menu.buildFromTemplate(template)
}

const reloadContextMenu = function () {
  /*
    builds menu in the clicked area with just one option "reload"
    in the browserwindow of electron app

    Returns:
      Menu: Electron Menu
    Usage:
        reloadContextMenu()
  */
  let template = cloneDeep(reloadMenuTemplate)

  return Menu.buildFromTemplate(template)
}
const buildContextMenu = function (prefix, suffix) {
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
  let template = cloneDeep(editorMenuTemplate)

  prefix = defaults({}, prefix, {
    exists: false,
    menuItems: []
  })

  suffix = defaults({}, suffix, {
    exists: false,
    menuItems: []
  })

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
  buildContextMenu: buildContextMenu,
  copyContextMenu: copyContextMenu,
  reloadContextMenu: reloadContextMenu
}
