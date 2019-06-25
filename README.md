# electron-context-menu

![npm](https://img.shields.io/npm/v/@anujdatar/electron-context-menu.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/anujdatar/electron-context-menu/badge)](https://www.codefactor.io/repository/github/anujdatar/electron-context-menu)
![Issues](https://img.shields.io/github/issues/anujdatar/electron-context-menu.svg)
![GitHub](https://img.shields.io/github/license/anujdatar/electron-context-menu.svg)

Right-click context menus for Electron.
Detects context if click area is editable or not.

Basic menu for uneditable areas:

![copy_menu](/docs/copy_menu.png)

More complex menu for editable areas:

![editor_menu](/docs/editor_menu.png)

You can also add prefixes and suffixes to either option.
Different menu options:

- Simple menu with only "copy" option: **copyContextMenu()**
- Simple menu with "paste" and "selectall" options: **pasteContextMenu()**
- Simple menu with only "page reload" option: **reloadContextMenu()**
- Menu when spell-check does not have suggestions: **noSuggestionsMenu()**
- Customizable menus for editable text-areas: **buildContextMenu()**

```js
buildContextMenu(prefix, suffix)
  /*
    function generates context menu inside a browserwindow of an electron app

    Args:
      prefix: Object - contains any prefix options required in the ctx menu
      suffix: Object - contains and suffix options required in the ctx menu
    Returns:
      Menu: Electron Menu
  */

// Usage

buildContextMenu() // basic menu for editable areas
// for menus with prefixs and or suffixes
buildContextMenu(prefix, suffix) // editor_menu - prefix and suffix
buildContextMenu({}, suffix) // editor_menu - no prefix, only suffix
```

## Installation

```js
npm install @anujdatar/electron-context-menu
```

## Usage example

```js
// in renderer or preload script
const electron = require('electron')
const remote = electron.remote
const { buildContextMenu,
  copyContextMenu,
  pasteContextMenu,
  reloadContextMenu } = remote.require('@anujdatar/electron-context-menu')

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    let ctxMenu
    if (!e.target.closest('textarea, input, [contenteditable="true"]')) {
      // if click in uneditable area
      if (window.getSelection().toString() === '') {
        // if no text selected
        ctxMenu = new reloadContextMenu()
        ctxMenu.popup(remote.getCurrentWindow())
      } else {
        // if text is selected
        ctxMenu = new copyContextMenu()
        ctxMenu.popup(remote.getCurrentWindow())
      }
    } else {
      // if click in editable text area
      if (window.getSelection().toString() === '') {
        // if no text is selected
        ctxMenu = new pasteContextMenu()
        ctxMenu.popup(remote.getCurrentWindow())
      } else {
        ctxMenu = new buildContextMenu()
        ctxMenu.popup(remote.getCurrentWindow())
      }
    }
  })
```

### Menu Customization

  adding *prefix* or *suffix* menu items to the context menu
  prefix and suffix: objects
    @param: exists - boolean - *true* when you need to add menu prefix
    @param menuItems - array - containing objects
      menuItem = {
        label - string - displayed in the menu,
        click -function - activated when label clicked in ctxMenu
      }

  ```js
  // example
  prefix = {
    exists: true,
    menuItems: []
  }
  ```

## Thanks

[Jeff Wear](https://github.com/wearhere) and MixMax's [electron-editor-context-menu](https://github.com/mixmaxhq/electron-editor-context-menu)

## Copyright and License

Copyright 2019 Anuj Datar, licensed under MIT License

## TODO

1. Add contexts for other type of elements, eg. images, etc.
2. Any ideas?
