This addon uses APIs available from Firefox 47 onwards.

## What it does

Displays a browser action button that **toggles hidden form inputs on/off persistently** in the active tab.

## How it works

- **Toggle button**: Registers a `browserAction` in the manifest. Clicking flips the `enabled` state in `chrome.storage.local`.
- **Manual toggle**: Background script (`main.js`) immediately applies changes to current page via `tabs.executeScript`.
- **Auto-persist**: Content script (`content.js`) runs on every page load (`document_idle`), checking storage state and auto-unhiding fields if enabled.
- **Visual state**: Supports badge/title updates for ON/OFF feedback (optional).

## Technical stack
- Manifest v2 with `storage`, `activeTab` permissions
- Non-persistent background script
- Content script matching `<all_urls>`

The addon will be submitted to Mozilla soon to be added to the add-ons page.[1][2]

[1](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local)
[2](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts)
