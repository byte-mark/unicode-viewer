# unicode-viewer

**Chrome extension that displays and highlights non-printable Unicode characters embedded in a webpage**

This extension provides a toggle button labeled **"Show Unicode"** in the upper-left corner of the screen. When clicked, it reveals and highlights non-printable Unicode characters.

---

## Behavior Summary

- Non-printable characters like tab (`\t`) or null (`\0`) are replaced with visible markers such as `[U+0009]`.
- Each marker is wrapped in a `<span class="unicode-highlight">` element with a yellow background.
- Click **"Show Unicode"** → The extension scans the page and displays highlighted Unicode markers.
- Click again → The page reloads to undo the changes.

---

## Installing Locally

1. Open Chrome and navigate to: `chrome://extensions`
2. Enable **Developer Mode** (toggle in the top-right)
3. Click **Load Unpacked**
4. Select the `unicode-viewer` directory (versioned folder, e.g., `unicode-viewer vX.X`)

