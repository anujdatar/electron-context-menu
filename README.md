# electron-context-menu

Right-click context menus for Electron.
Detects context if click area is editable or not.

Basic menu for uneditable areas:
[copy_menu](/docs/copy_menu.png)

More complex menu for editable areas:
[editor_menu](/docs/editor_menu.png)

You can also add prefixes and suffixes to either option.

```js
buildContextMenu(prefix, suffix, menuType)
  /*
    function generates context menu inside a browserwindow of an electron app

    Args:
      prefix: Object - contains any prefix options required in the ctx menu
      suffix: Object - contains and suffix options required in the ctx menu
      menuType: String - select between "copy" menu and "editor" menu
    Returns:
      Menu: Electron Menu
  */
const buildContextMenu = remote.require('@anujdatar/electron-context-menu')

// for just simple menus no prefis or suffix in either menus
buildContextMenu()  // simple copy_menu
buildContextMenu({}, {}, 'editor') // for basic editor_menu
// for menus with prefixs and or suffixes
buildContextMenu(prefix, suffix) // complex copy_menu - prefix and suffix
buildContextMenu({}, suffix, 'editor') // editor_menu - no prefix, only suffix
```

## Installation

```js
npm install @anujdatar/electron-context-menu
```

## Usage

```js
// in renderer or preload script
const electron = require('electron')
const remote = electron.remote
const buildContextMenu = remote.require('@anujdatar/electron-context-menu')

window.addEventListener('contextmenu', function(e) {
  let ctxMenu
  if (!e.target.closest('textarea, input, [contenteditable="true"]')) {
    ctxMenu = new ctxMenuBuilder()
  } else {
    ctxMenu = new ctxMenuBuilder({}, {}, '')
  }
  ctxMenu.popup(remote.getCurrentWindow())
})
```

### Menu Customization

  adding *prefixs* or *suffixs* to the context menu
  prefix and suffix: objects
    @param: exists - boolean - *true* when you need to add menu prefix
    @param menuItems - array - containing objects
      menuItem = {
        label - string - displayed in the menu,
        click -function - activated when label clicked in ctxMenu
      }

  ```js
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
