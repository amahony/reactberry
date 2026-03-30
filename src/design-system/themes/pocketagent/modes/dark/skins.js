import { breakpoints, fontSizes, sizes, space } from "../../tokens/space";
import { shapes } from "../../tokens/shapes";
import { shadows } from "../../tokens/shadows";
import { getShade, getTint, getTransparent } from "../../utils";
import { controlSizes } from "../../tokens/controls";
import colors from "./config";
import { borderWidth } from "styled-system";

// TODO: Decide if we want to include borderColor.
const staticPairs = {
  red: {
    color: colors.palette.reds[11],
    backgroundColor: colors.palette.reds[2],
  },
  orange: {
    color: colors.palette.oranges[0],
    backgroundColor: colors.palette.oranges[6],
  },
  yellow: {
    color: colors.palette.yellows[1],
    backgroundColor: colors.palette.yellows[9],
  },
  green: {
    color: colors.palette.greens[0],
    backgroundColor: colors.palette.greens[7],
  },
  teal: {
    color: colors.palette.teals[0],
    backgroundColor: colors.palette.teals[7],
  },
  blue: {
    color: colors.palette.blues[0],
    backgroundColor: colors.palette.blues[7],
  },
  purple: {
    color: colors.palette.purples[0],
    backgroundColor: colors.palette.purples[7],
  },
  pink: {
    color: colors.palette.pinks[0],
    backgroundColor: colors.palette.pinks[7],
  },
  gray: {
    color: colors.palette.grays[0],
    backgroundColor: colors.palette.grays[7],
  },
  primary: {
    backgroundColor: colors.palette.brands[5],
    color: colors.dark,
    borderColor: colors.palette.brands[4],
  },
  accent: {
    color: colors.palette.accents[0],
    backgroundColor: colors.palette.accents[7],
  },
  neutral: {
    color: colors.palette.neutrals[0],
    backgroundColor: colors.palette.neutrals[8],
  },
};

const signalPairs = {
  error: {
    color: colors.palette.reds[8],
    backgroundColor: colors.palette.reds[0],
    static: {
      color: colors.palette.reds[0],
      backgroundColor: colors.palette.reds[7],
    },
  },
};

const stateSkins = {
  highlight: {
    color: colors.light,
    backgroundColor: colors.transparent.dark[2],
    borderColor: colors.palette.brands[6],
    boxShadow: "0 0 0 3px " + getTransparent(colors.palette.brands[3], 0.2),
  },
};

const surfaceSkins = {
  base: {
    color: colors.light,
    backgroundColor: colors.base,
    borderColor: colors.transparent.light[1],
    shade: {
      backgroundColor: getShade(colors.base, 0.25),
      borderColor: colors.transparent.light[1],
    },
    tint: {
      backgroundColor: getTint(colors.base, 0.025),
      borderColor: colors.transparent.light[1],
    },
  },
  surface: {
    color: colors.light,
    backgroundColor: colors.surface,
    borderColor: colors.transparent.light[1],
    shade: {
      backgroundColor: getShade(colors.surface, 0.25),
      borderColor: colors.transparent.light[1],
    },
    tint: {
      backgroundColor: getTint(colors.surface, 0.025),
      borderColor: colors.transparent.light[1],
    },
  },
  panel: {
    color: colors.light,
    backgroundColor: colors.panel,
    borderColor: colors.transparent.light[1],
    shade: {
      backgroundColor: getShade(colors.panel, 0.25),
      borderColor: colors.transparent.light[1],
    },
    tint: {
      backgroundColor: getTint(colors.panel, 0.025),
      borderColor: colors.transparent.light[1],
    },
  },
  card: {
    color: colors.light,
    backgroundColor: colors.card,
    border: "0.5px solid",
    borderColor: colors.transparent.light[1],
    shade: {
      backgroundColor: getShade(colors.card, 0.25),
      borderColor: colors.transparent.light[1],
    },
    tint: {
      backgroundColor: getTint(colors.card, 0.025),
      borderColor: colors.transparent.light[1],
    },
    brand: {
      backgroundColor: colors.transparent.brand[2],
      borderColor: colors.transparent.brand[10],
    },
  },
  overlay: {
    color: colors.light,
    backgroundColor: colors.overlay,
    borderColor: colors.transparent.light[1],
    shade: {
      backgroundColor: getShade(colors.overlay, 0.25),
      borderColor: colors.transparent.light[1],
    },
    tint: {
      backgroundColor: getTint(colors.overlay, 0.025),
      borderColor: colors.transparent.light[1],
    },
  },
};

const specialSkins = {
  transparent: {
    color: colors.secondary,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  translucent: {
    borderColor: colors.transparent.light[2],
    backdropFilter: "blur(8px)",
    "-webkit-backdrop-filter": "blur(8px)",
    backgroundColor: getTransparent(colors.overlay, 0.8),
    color: colors.primary,
    light: {
      borderColor: colors.transparent.light[8],
      backdropFilter: "blur(8px)",
      "-webkit-backdrop-filter": "blur(8px)",
      backgroundColor: colors.transparent.light[3],
      color: colors.primary,
    },
  },
};

const hoverSkins = {
  default: {
    color: colors.light,
    backgroundColor: colors.transparent.dark[1],
  },
  subtle: {
    backgroundColor: getTransparent(colors.palette.brands[11], 0.15),
    color: colors.light,
  },
  brand: {
    color: colors.dark,
    backgroundColor: colors.palette.brands[7],
  },
  error: {
    color: colors.palette.reds[0],
    backgroundColor: colors.palette.reds[8],
  },
};

const colorPairs = {
  ...staticPairs,
  ...specialSkins,
  ...signalPairs,
  ...surfaceSkins,
  ...stateSkins,
  dark: surfaceSkins.base,
  hover: hoverSkins,
};

const skins = {
  ...colorPairs,
  button: {
    default: {
      color: colors.light,
      backgroundColor: colors.transparent.light[1],
      border: "1px solid",
      borderColor: colors.transparent.light[1],
      boxShadow: "0 1px 0 0 rgba(0,0,0,0.12)",
      "&:hover": {
        ...hoverSkins.brand,
      },
    },
    primary: {
      border: "1px solid",
      ...colorPairs.primary,
      borderColor: colors.transparent.light[1],
      "&:hover": {
        ...hoverSkins.brand,
      },
    },
    outline: {
      color: colors.light,
      border: "1px solid",
      backgroundColor: "transparent",
      borderColor: colors.transparent.light[3],
      "&:hover": {
        ...hoverSkins.brand,
      },
    },
    subtle: {
      backgroundColor: colors.transparent.light[0],
      border: "1px solid",
      borderColor: "transparent",
      color: colors.tertiary,
      "&:hover": {
        ...hoverSkins.subtle,
      },
    },
    solid: {
      backgroundColor: colors.white,
      border: "none",
      borderColor: "transparent",
      color: colors.primary,
      boxShadow: shadows.large,
      "&:hover": {
        transform: "scale(1.15)",
        boxShadow: shadows.xlarge,
      },
    },
    ghost: {
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: "transparent",
      color: colors.secondary,
      "&:hover": {
        ...hoverSkins.subtle,
      },
      danger: {
        color: colors.primary,
        backgroundColor: getTransparent(colors.red, 0.25),
        borderColor: getTransparent(colors.red, 0.5),
        "&:hover": {
          ...hoverSkins.error,
        },
      },
      subtle: {
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "transparent",
        color: colors.tertiary,
        "&:hover": {
          ...hoverSkins.subtle,
        },
      },
    },
    clean: {
      border: "0px solid",
      backgroundColor: "transparent",
      color: colors.light,
      borderColor: "transparent",
      borderRadius: 0,
    },
    cta: {
      color: colors.dark,
      backgroundColor: colors.palette.brands[5],
      border: "1px solid",
      borderColor: colors.palette.brands[0],
      boxShadow:
        "0 2px 2px 0 rgba(0,0,0,0.072), 0 0px 10px 2px rgba(0,0,0,0.082)",
      "&:hover": {
        ...hoverSkins.brand,
      },
    },
    danger: {
      ...colorPairs.error.static,
      "&:hover": {
        ...colorPairs.error.interactive,
      },
    },
    bubble: {
      color: colors.white,
      backgroundColor: getTransparent(colors.dark, 0.9),
      border: "1px solid",
      borderColor: getTransparent(colors.light, 0.1),
      boxShadow: "0 1px 0 0 rgba(0,0,0,0.12)",
      "&:hover": {
        ...hoverSkins.brand,
      },
    },
    sizes: {
      xxsmall: {
        ...controlSizes.xxsmall,
        fontSize: fontSizes[2],
        fontWeight: 700,
      },
      xsmall: {
        ...controlSizes.xsmall,
        fontSize: fontSizes[3],
        fontWeight: 600,
      },
      small: {
        ...controlSizes.small,
        fontSize: fontSizes[4],
        fontWeight: 500,
      },
      medium: {
        ...controlSizes.medium,
        fontSize: fontSizes[4],
        fontWeight: 600,
        condensed: {
          ...controlSizes.medium,
          fontSize: fontSizes[4],
          fontWeight: 600,
          paddingLeft: space.xs,
          paddingRight: space.xs,
        },
      },
      large: {
        ...controlSizes.large,
        fontSize: fontSizes[5],
        fontWeight: 600,
      },
      xlarge: {
        ...controlSizes.xlarge,
        fontSize: fontSizes[5],
        fontWeight: 600,
      },
      icon: {
        width: space[14],
        height: space[14],
        large: {
          width: space[15],
          height: space[15],
        },
        small: {
          width: space[13],
          height: space[13],
        },
        xsmall: {
          width: space[12],
          height: space[12],
        },
        xxsmall: {
          width: space[11],
          height: space[11],
        },
      },
    },
  },
  field: {
    default: {
      border: "1px solid",
      backgroundColor: colors.palette.darks[4],
      color: colors.light,
      borderColor: colors.palette.darks[5],
      "&:hover": {
        borderColor: getTransparent(colors.palette.neutrals[5], 0.7),
        color: colors.light,
      },
      "&:focus": {
        borderColor: getTransparent(colors.palette.brands[5], 0.7),
        color: colors.light,
        outline: "none",
      },
      "&::placeholder": {
        opacity: 0.6,
      },
      // "&:focus": {
      //   outline: "none",
      // },
    },
    primary: {
      border: "1px solid",
      backgroundColor: colors.palette.neutrals[7],
      color: colors.light,
      borderColor: colors.palette.neutrals[4],
      "&:hover, &:focus": {
        backgroundColor: colors.palette.neutrals[2],
        color: colors.light,
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.light,
      },
    },
    subtle: {
      border: "0px solid",
      backgroundColor: colors.surface,
      color: colors.light,
      borderColor: "transparent",
      "&:hover, &:focus": {
        borderColor: "transparent",
        color: colors.light,
        outline: "none",
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.light,
      },
    },
    ghost: {
      border: "0px solid",
      backgroundColor: "transparent",
      color: colors.light,
      borderColor: "transparent",
      borderRadius: 0,
      "&:hover, &:focus": {
        borderColor: "transparent",
        color: colors.light,
        outline: "none",
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.light,
      },
    },
    outline: {
      border: "1px solid",
      backgroundColor: colors.light,
      color: colors.light,
      borderColor: colors.palette.reds[4],
      borderRadius: 0,
      "&:hover, &:focus": {
        borderColor: "transparent",
        color: colors.light,
        outline: "none",
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.light,
      },
    },
    underline: {
      border: "2px solid",
      // borderWidth: "0px 0px 1px 0px",
      backgroundColor: colors.palette.reds[4],
      color: colors.light,
      borderColor: colors.palette.reds[4],
      borderRadius: 0,
      "&:hover, &:focus": {
        borderColor: "transparent",
        color: colors.light,
        outline: "none",
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.light,
      },
    },
    checked: {
      border: "1px solid",
      backgroundColor: colors.palette.brands[6],
      color: colors.dark,
      borderColor: colors.palette.brands[1],
      "&:hover, &:focus": {
        backgroundColor: colors.palette.brands[7],
        borderColor: colors.palette.brands[0],
        color: colors.dark,
      },
      "&::placeholder": {
        opacity: 0.6,
      },
      "&:focus": {
        outline: "none",
      },
    },
    sizes: {
      xsmall: {
        ...controlSizes.xsmall,
        fontSize: fontSizes[3],
        fontWeight: 400,
        select: {
          fontSize: fontSizes[3],
          fontWeight: 400,
          height: space[11],
          paddingLeft: space.xs,
          paddingRight: space.m,
          paddingTop: space.mini,
          paddingBottom: space.mini,
        },
      },
      small: {
        ...controlSizes.small,
        fontSize: fontSizes[4],
        fontWeight: 400,
      },
      medium: {
        //...controlSizes.medium,
        paddingLeft: space.s,
        paddingRight: space.s,
        paddingTop: space.xsmall,
        paddingBottom: space.xsmall,
        fontSize: fontSizes[4],
        fontWeight: 400,
      },
      large: {
        // height: space[15],
        paddingLeft: space.s,
        paddingRight: space.s,
        paddingTop: space.xsmall,
        paddingBottom: space.xsmall,
        fontSize: fontSizes[5],
        fontWeight: 400,
      },
    },
  },
  link: {
    default: {
      color: colors.palette.brands[8],
      textDecoration: "underline",
      textDecorationColor: colors.transparent.light[3],
      textDecorationThickness: "1px",
    },
    highlight: {
      color: colors.palette.brands[5],
      textDecoration: "underline",
      textDecorationColor: colors.palette.brands[2],
      textDecorationThickness: "1px",
    },
    ghost: {
      // color: "currentColor",
    },
    underline: {
      color: colors.palette.brands[7],
      textDecoration: "underline",
      textDecorationColor: colors.palette.brands[5],
      textDecorationThickness: "1px",
      //textUnderlinePosition: "under",
    },
    button: {
      paddingLeft: space.s,
      paddingRight: space.s,
      paddingTop: space.mini,
      paddingBottom: space.mini,
      ...shapes.rounded,
      color: colors.primary,
      backgroundColor: getTransparent(colors.primary, 0.05),
      "&:hover": {
        ...colorPairs.primary.hover,
      },
    },
  },
  textarea: {
    //border: "1px solid",
    backgroundColor: getShade(colors.surface, 0.2),
    color: colors.light,
    //borderColor: colors.palette.neutrals[4],
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: colors.base,
      borderColor: colors.palette.brands[5],
      color: colors.white,
      boxShadow: "0 0 0 1px " + getTransparent(colors.palette.brands[3], 0.85),
    },
    "& *::placeholder": {
      opacity: 0.6,
    },
    "&:focus": {
      outline: "none",
    },
  },
  codeblock: {
    backgroundColor: colors.base,
    color: colors.light,
    highlight: {
      color: colors.palette.brands[10],
      backgroundColor: colors.transparent.brand[4],
      "& > code": {
        backgroundColor: "transparent",
      },
    },
  },
  row: {
    backgroundColor: "transparent",
    color: colors.primary,
    "&:hover, &:focus": {
      ...hoverSkins.default,
    },
    header: {
      backgroundColor: colors.transparent.brand[5],
      color: colors.primary,
    },
    selected: {
      backgroundColor: colors.transparent.brand[1],
      color: colors.primary,
      "&:hover, &:focus": {
        backgroundColor: colors.transparent.brand[0],
        color: colors.primary,
      },
    },
  },
};

const skinconfig = {
  colors,
  colorPairs,
  controlSizes,
  breakpoints,
  fontSizes,
  space,
  sizes,
  shapes,
  skins,
  shadows,
};

export default skinconfig;
