import {space} from './space';
import {fontSizes} from './typography';

export const iconSizes = {
  xxlarge: {width: space.xxlarge, height: space.xxlarge},
  xlarge: {width: space.xlarge, height: space.xlarge},
  large: {width: space[9], height: space[9]},
  medium: {width: space.medium, height: space.medium},
  small: {width: space.small, height: space.small},
  xsmall: {width: space.xsmall, height: space.xsmall}
};

iconSizes.xl = iconSizes.xlarge;
iconSizes.l = iconSizes.large;
iconSizes.s = iconSizes.small;
iconSizes.xs = iconSizes.xsmall;

export const buttonSizes = {
  xsmall: {
    fontSize: fontSizes[2],
    padding: `0 ${space.small}`,
    height: space[11],
    lineHeight: space[11]
  },
  small: {
    fontSize: fontSizes[3],
    padding: `0 ${space[7]}`,
    height: space[12],
    lineHeight: space[12]
  },
  medium: {
    fontSize: fontSizes[3],
    padding: `0 ${space.medium}`,
    height: space[13],
    lineHeight: space[13]
  },
  large: {
    fontSize: fontSizes[6],
    padding: `0 ${space.large}`,
    height: '2.75rem',
    lineHeight: '2.75rem'
  },
  custom: {}
};

export const avatarSizes = {
  xlarge: {width: space[14], height: space[14]},
  large: {width: space[13], height: space[13]},
  medium: {width: space[12], height: space[12]},
  small: {width: space[10], height: space[10]},
  xsmall: {width: space[8], height: space[8]}
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
    padding: space.none,
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

export const tagSizes = {
  xsmall: {
    fontSize: fontSizes[0],
    padding: `0 ${space.xsmall}`,
    height: '1rem',
    lineHeight: 1,
    fontWeight: 900
  },
  small: {
    fontSize: fontSizes[1],
    padding: `0 ${space.xsmall}`,
    height: '1.25rem',
    lineHeight: 1,
    fontWeight: 700
  },
  medium: {
    fontSize: fontSizes[2],
    padding: `0 ${space.small}`,
    height: '1.5rem',
    lineHeight: 1,
    fontWeight: 700
  },
  large: {
    fontSize: fontSizes[3],
    padding: `0 ${space.medium}`,
    height: '1.75rem',
    lineHeight: 1,
    fontWeight: 700
  },
  custom: {}
};

export const skeletonSizes = {
  xsmall: {height: space.xsmall},
  small: {height: space.small},
  medium: {height: space.medium},
  large: {height: space[12]},
  xlarge: {height: space[15]},
  xxlarge: {height: space[16]}
};

export const controlSizes = {
  button: buttonSizes,
  icon: iconSizes,
  avatar: avatarSizes,
  badge: badgeSizes,
  switch: switchSizes,
  tag: tagSizes,
  skeleton: skeletonSizes
};