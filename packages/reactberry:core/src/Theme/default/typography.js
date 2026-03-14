const bodyFont =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', sans-serif";

const monoFont =
  "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Monaco, Courier, monospace";

export const fonts = {
  body: bodyFont,
  heading: bodyFont,
  monospace: monoFont
};

export const fontFamily = {
  default: fonts.body,
  body: fonts.body,
  heading: fonts.heading,
  monospace: fonts.monospace,
  sans: fonts.body
};

export const fontSizes = [
  '0.5rem',
  '0.625rem',
  '0.75rem',
  '0.875rem',
  '1rem',
  '1.125rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
  '3rem',
  '4rem'
];

export const fontWeights = {
  hairline: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};

export const lineHeights = {
  none: 1,
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625
};

export const letterSpacings = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.02em',
  wider: '0.04em'
};

export const textSizes = {
  xxlarge: {fontSize: fontSizes[8], lineHeight: lineHeights.tight},
  xlarge: {fontSize: fontSizes[7], lineHeight: lineHeights.tight},
  large: {fontSize: fontSizes[6], lineHeight: lineHeights.snug},
  medium: {fontSize: fontSizes[4], lineHeight: lineHeights.normal},
  small: {fontSize: fontSizes[3], lineHeight: lineHeights.normal},
  xsmall: {fontSize: fontSizes[2], lineHeight: lineHeights.normal},
  xxsmall: {fontSize: fontSizes[1], lineHeight: lineHeights.snug}
};

export const headingSizes = {
  xxlarge: {
    fontSize: fontSizes[10],
    lineHeight: lineHeights.tight,
    fontFamily: fonts.heading,
    letterSpacing: letterSpacings.tight
  },
  xlarge: {
    fontSize: fontSizes[9],
    lineHeight: lineHeights.tight,
    fontFamily: fonts.heading,
    letterSpacing: letterSpacings.tight
  },
  large: {
    fontSize: fontSizes[8],
    lineHeight: lineHeights.tight,
    fontFamily: fonts.heading,
    letterSpacing: letterSpacings.tight
  },
  medium: {
    fontSize: fontSizes[6],
    lineHeight: lineHeights.snug,
    fontFamily: fonts.heading
  },
  small: {
    fontSize: fontSizes[4],
    lineHeight: lineHeights.snug,
    fontFamily: fonts.heading
  },
  xsmall: {
    fontSize: fontSizes[3],
    lineHeight: lineHeights.normal,
    fontFamily: fonts.heading
  }
};