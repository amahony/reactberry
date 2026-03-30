import { space } from "./space";

export const controlSizes = {
  xxxsmall: {
    height: space[10],
    paddingLeft: space.xs,
    paddingRight: space.xs,
    paddingTop: space.mini,
    paddingBottom: space.mini,
  },
  xxsmall: {
    height: space[11],
    paddingLeft: space.xs,
    paddingRight: space.xs,
    paddingTop: space.mini,
    paddingBottom: space.mini,
  },
  xsmall: {
    height: space[12],
    paddingLeft: space.s,
    paddingRight: space.s,
    paddingTop: space.xxxsmall,
    paddingBottom: space.xxxsmall,
  },
  small: {
    height: space[13],
    paddingLeft: space.s,
    paddingRight: space.s,
    paddingTop: space.xxxsmall,
    paddingBottom: space.xxxsmall,
  },
  medium: {
    height: space[14],
    paddingLeft: space.m,
    paddingRight: space.m,
    paddingTop: space.xsmall,
    paddingBottom: space.xsmall,
  },
  large: {
    height: space[15],
    paddingLeft: space.xl,
    paddingRight: space.xl,
    paddingTop: space.xsmall,
    paddingBottom: space.xsmall,
  },
  xlarge: {
    height: space[16],
    paddingLeft: space.xxl,
    paddingRight: space.xxl,
    paddingTop: space.xsmall,
    paddingBottom: space.xsmall,
  },
};
