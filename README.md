# TamperMonkey-Other

Miscellaneous Tampermonkey userscripts that do not belong in the Syncro-specific repository.

These are primarily browser-side quality-of-life fixes for services such as SharePoint and other web applications.

## Scripts

### SharePoint - Dark Theme Shell Fix

**File:** `SharePoint - Dark Theme Shell Fix.js`

Fixes the bright white SharePoint app-bar shell that can appear around dark-themed SharePoint sites.

The script:

- Darkens the SharePoint app-bar shell.
- Fixes the white area around the SharePoint app-bar portal slot.
- Makes the left-side app-bar icons and labels visible on the dark background.
- Uses stable SharePoint IDs and classes where possible instead of randomized Fluent UI classes.
- Leaves the existing SharePoint site theme and page content intact.
- Reapplies the fix when SharePoint rebuilds parts of the interface during SPA navigation.

Current version:

```text
1.0.0
