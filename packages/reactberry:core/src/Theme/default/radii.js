const radius = ['0px', '2px', '4px', '6px', '8px', '12px', '16px', '24px', '999px', '50%'];

radius.none = radius[0];
radius.rounded = radius[4];
radius.pill = radius[8];
radius.circle = radius[9];

export {radius};

export const radii = {
  none: radius[0],
  xsmall: radius[1],
  small: radius[2],
  medium: radius[4],
  large: radius[5],
  xlarge: radius[6],
  xxlarge: radius[7],
  pill: radius[8],
  circle: radius[9]
};

export const shapes = {
  square: {borderRadius: radii.none},
  rounded: {borderRadius: radii.medium},
  pill: {borderRadius: radii.pill},
  circle: {borderRadius: radii.circle, padding: '0'},
  roundedTop: {
    borderTopLeftRadius: radii.medium,
    borderTopRightRadius: radii.medium
  }
};