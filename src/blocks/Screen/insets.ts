/**
 * Space the fixed mobile app chrome and the device safe areas take away from a
 * screen. `env(...)` resolves to 0 outside standalone/notched contexts, so the
 * same expression is correct in a browser tab and in the installed PWA.
 */
export const SAFE_TOP = "env(safe-area-inset-top, 0px)"
export const SAFE_BOTTOM = "env(safe-area-inset-bottom, 0px)"

/** MobileNavContainer top row: p="s" (12px) + 3rem slot + pb="m" (16px). */
export const MOBILE_TOP_BAR = "4.75rem"

/** BottomToolbar: 3rem AI button + its 20px offset from the bottom edge. */
export const MOBILE_BOTTOM_BAR = "4.25rem"

/** Offset of the first pixel a mobile screen may paint into. */
export const MOBILE_TOP_INSET = `calc(${SAFE_TOP} + ${MOBILE_TOP_BAR})`

/** Offset of the last pixel a mobile screen may paint into. */
export const MOBILE_BOTTOM_INSET = `calc(${SAFE_BOTTOM} + ${MOBILE_BOTTOM_BAR})`
