export const breakpoints = ['32rem', '48rem', '64rem', '80rem'];

export const space = [
  '0rem',
  '0.125rem',
  '0.25rem',
  '0.375rem',
  '0.5rem',
  '0.625rem',
  '0.75rem',
  '0.875rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
  '2.5rem',
  '3rem',
  '4rem',
  '8rem',
  '16rem',
  '32rem',
  '64rem',
  '128rem'
];

// Breakpoints alias
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Space alias
space.xxxsmall = space[1]; // .125rem - 2px
space.xxsmall = space[2]; // .25rem - 4px
space.xsmall = space[4]; // .5rem - 8px
space.small = space[6]; // . 75rem - 12px
space.medium = space[8]; // 1rem - 4px
space.large = space[10]; // 1.5rem - 4px
space.xlarge = space[12]; // 2rem - 4px
space.xxlarge = space[14]; // 3rem - 4px
space.xxxlarge = space[15]; // 4rem - 4px

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

export const iconSizes = {
  xxlarge: { width: space.xxlarge, height: space.xxlarge },
  xlarge: { width: space.xlarge, height: space.xlarge },
  large: { width: space[9], height: space[9] },
  medium: { width: space.medium, height: space.medium },
  small: { width: space.small, height: space.small },
  xsmall: { width: space.xsmall, height: space.xsmall }
};
// Iconsize alias
iconSizes.xl = iconSizes.xlarge;
iconSizes.l = iconSizes.large;
iconSizes.s = iconSizes.small;
iconSizes.xs = iconSizes.xsmall;

export const textSizes = {
  xxlarge: { fontSize: fontSizes[8] },
  xlarge: { fontSize: fontSizes[7] },
  large: { fontSize: fontSizes[6] },
  medium: { fontSize: fontSizes[4] },
  small: { fontSize: fontSizes[3] },
  xsmall: { fontSize: fontSizes[2] },
  xxsmall: { fontSize: fontSizes[1] }
};

export const headingSizes = {
  xxlarge: { fontSize: fontSizes[10] },
  xlarge: { fontSize: fontSizes[9] },
  large: { fontSize: fontSizes[8] },
  medium: { fontSize: fontSizes[6] },
  small: { fontSize: fontSizes[4] },
  xsmall: { fontSize: fontSizes[3] }
};

export const avatarSizes = {
  xlarge: {
    width: space[14],
    height: space[14]
  },
  large: {
    width: space[13],
    height: space[13]
  },
  medium: {
    width: space[12],
    height: space[12]
  },
  small: {
    width: space[10],
    height: space[10]
  },
  xsmall: {
    width: space[8],
    height: space[8]
  }
};

export const badgeSizes = {
  large: {
    minWidth: space[10],
    height: space[10],
    padding: space[3],
    fontSize: fontSizes[4]
  },
  medium: {
    minWidth: space[9],
    height: space[9],
    padding: space[3],
    fontSize: fontSizes[2]
  },
  small: {
    minWidth: space[6],
    height: space[6],
    padding: space[2],
    fontSize: fontSizes[2]
  },
  xsmall: {
    width: space[4],
    height: space[4],
    padding: space[0],
    fontSize: 0
  }
};

export const switchSizes = {
  large: {
    width: space.xxxlarge,
    height: space.xlarge
  },
  medium: {
    width: space.xxlarge,
    height: space.large
  },
  small: {
    width: space.xlarge,
    height: space.medium
  }
};
