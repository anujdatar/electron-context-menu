import cloneDeep from 'lodash.clonedeep'
import defaults from 'lodash.defaults'
import isEmpty from 'lodash.isempty'

const remote = require('electron').remote
const Menu = remote.require('electron').Menu

const test = [
  { role: 'reload' }
]

const BuildContextMenu = function (menuTemplate = test, prefix, suffix) {
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

module.exports = { BuildContextMenu }
