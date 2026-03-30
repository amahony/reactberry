/**
 * Ref-counted theme-color override for overlay components (Modal, Drawer, etc.).
 *
 * Multiple overlays can be open at once (e.g. a confirmation dialog inside a
 * modal). We only restore the original theme-color when the *last* overlay
 * unmounts.
 */

let themeColorRefCount = 0;
let themeColorOriginal: string | null = null;
let htmlBgOriginal: string | null = null;
let bodyOverflowOriginal: string | null = null;

const OVERLAY_THEME_COLOR = "#000000";

/**
 * Only tint the Safari chrome / html background on touch devices
 * where the address-bar colour is visible. On desktop it's purely jarring.
 */
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export function pushThemeColor() {
  if (themeColorRefCount === 0) {
    if (isTouchDevice()) {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        themeColorOriginal = meta.getAttribute("content");
        meta.setAttribute("content", OVERLAY_THEME_COLOR);
      }
      const html = document.documentElement;
      htmlBgOriginal = html.style.backgroundColor;
      html.style.backgroundColor = OVERLAY_THEME_COLOR;
    }

    // Lock body scroll while any overlay is open
    bodyOverflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  themeColorRefCount++;
}

export function popThemeColor() {
  themeColorRefCount = Math.max(0, themeColorRefCount - 1);
  if (themeColorRefCount === 0) {
    if (themeColorOriginal !== null) {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", themeColorOriginal);
      themeColorOriginal = null;
    }
    if (htmlBgOriginal !== null) {
      document.documentElement.style.backgroundColor = htmlBgOriginal;
      htmlBgOriginal = null;
    }

    // Restore body scroll
    document.body.style.overflow = bodyOverflowOriginal ?? "";
    bodyOverflowOriginal = null;
  }
}
