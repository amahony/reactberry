import colors from './colors';
import {
  avatarSizes,
  badgeSizes,
  controlSizes,
  iconSizes,
  switchSizes
} from './controls';
import {breakpoints, space} from './space';
import {radius, radii, shapes} from './radii';
import {
  buttonStyles,
  colorStyles,
  layoutStyles,
  presets,
  skeletonStyles,
  tagStyles
} from './styles';
import shadows from './shadows';
import {
  fontFamily,
  fontSizes,
  fontWeights,
  fonts,
  headingSizes,
  letterSpacings,
  lineHeights,
  textSizes
} from './typography';
import GlobalStyle from './utils';

const defaultTheme = {
  colors,
  breakpoints,
  space,
  radius,
  radii,
  shapes,
  fonts,
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  iconSizes,
  textSizes,
  headingSizes,
  controlSizes,
  buttonStyles,
  layoutStyles,
  skeletonStyles,
  avatarSizes,
  badgeSizes,
  switchSizes,
  tagStyles,
  colorStyles,
  presets,
  shadows
};

export default defaultTheme;
export {
  avatarSizes,
  badgeSizes,
  breakpoints,
  buttonStyles,
  colorStyles,
  colors,
  controlSizes,
  defaultTheme,
  fontFamily,
  fontSizes,
  fontWeights,
  fonts,
  GlobalStyle,
  headingSizes,
  iconSizes,
  layoutStyles,
  letterSpacings,
  lineHeights,
  presets,
  radius,
  radii,
  shadows,
  shapes,
  skeletonStyles,
  space,
  switchSizes,
  tagStyles,
  textSizes
};
