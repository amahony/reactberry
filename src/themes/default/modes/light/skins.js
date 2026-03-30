import { breakpoints, fontSizes, sizes, space } from "../../tokens/space"
import { shapes } from "../../tokens/shapes"
import { shadows } from "../../tokens/shadows"
import { getShade, getTint, getTransparent } from "../../utils"
import { controlSizes } from "../../tokens/controls"
import colors from "./config"

// TODO: Decide if we want to include borderColor.
const staticPairs = {
  red: {
    color: colors.palette.reds[0],
    backgroundColor: colors.palette.reds[7],
  },
  orange: {
    color: colors.palette.oranges[11],
    backgroundColor: colors.palette.oranges[6],
  },
  yellow: {
    color: colors.palette.yellows[11],
    backgroundColor: colors.palette.yellows[5],
  },
  green: {
    color: colors.palette.greens[11],
    backgroundColor: colors.palette.greens[5],
  },
  teal: {
    color: colors.palette.teals[11],
    backgroundColor: colors.palette.teals[5],
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
    color: colors.palette.pinks[11],
    backgroundColor: colors.palette.pinks[5],
  },
  gray: {
    color: colors.palette.grays[11],
    backgroundColor: colors.palette.grays[5],
  },
  primary: {
    backgroundColor: colors.palette.brands[6],
    color: colors.dark,
    borderColor: colors.palette.brands[4],
  },
  accent: {
    color: colors.white,
    backgroundColor: colors.palette.accents[6],
    subtle: {
      color: colors.palette.accents[10],
      backgroundColor: colors.palette.accents[1],
    },
  },
  neutral: {
    color: colors.palette.neutrals[0],
    backgroundColor: colors.palette.neutrals[8],
  },
  contrast: {
    backgroundColor: colors.light,
    color: colors.dark,
  },
  none: {
    color: "inherit",
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
}

const signalPairs = {
  error: {
    static: {
      color: colors.palette.reds[0],
      backgroundColor: colors.error,
      borderColor: colors.palette.reds[8],
    },
    interactive: {
      color: colors.palette.reds[0],
      backgroundColor: getShade(colors.error, 0.3),
    },
    subtle: {
      color: colors.palette.reds[9],
      backgroundColor: colors.palette.reds[1],
    },
    light: {
      color: colors.palette.reds[9],
      backgroundColor: colors.palette.reds[0],
    },
  },
  success: {
    static: {
      color: colors.palette.greens[0],
      backgroundColor: colors.success,
    },
    interactive: {
      color: colors.palette.greens[0],
      backgroundColor: getShade(colors.success, 0.3),
    },
    subtle: {
      color: colors.palette.greens[9],
      backgroundColor: colors.palette.greens[1],
    },
  },
  warning: {
    static: {
      color: colors.palette.yellows[10],
      backgroundColor: colors.palette.yellows[3],
    },
    interactive: {
      color: colors.palette.yellows[0],
      backgroundColor: getShade(colors.warning, 0.3),
    },
    subtle: {
      color: colors.palette.yellows[9],
      backgroundColor: colors.palette.yellows[0],
    },
  },
  info: {
    static: {
      color: colors.palette.blues[10],
      backgroundColor: colors.palette.blues[3],
    },
    interactive: {
      color: colors.palette.blues[0],
      backgroundColor: getShade(colors.blue, 0.3),
    },
    subtle: {
      color: colors.palette.blues[9],
      backgroundColor: colors.palette.blues[1],
    },
    light: {
      color: colors.palette.blues[9],
      backgroundColor: colors.palette.blues[0],
    },
  },
  brand: {
    static: {
      color: colors.palette.brands[10],
      backgroundColor: colors.palette.brands[3],
    },
    interactive: {
      color: colors.palette.brands[0],
      backgroundColor: getShade(colors.brand, 0.3),
    },
    subtle: {
      color: colors.palette.brands[9],
      backgroundColor: colors.palette.brands[0],
      borderColor: colors.transparent.light[5],
    },
  },
  neutral: {
    static: {
      color: colors.palette.neutrals[10],
      backgroundColor: colors.palette.neutrals[3],
    },
    interactive: {
      color: colors.palette.neutrals[0],
      backgroundColor: getShade(colors.neutral, 0.3),
    },
    subtle: {
      color: colors.palette.neutrals[9],
      backgroundColor: colors.palette.neutrals[2],
    },
  },
  signal: {
    static: {
      color: colors.red,
      backgroundColor: colors.signal,
    },
    interactive: {
      color: colors.palette.neutrals[0],
      backgroundColor: getShade(colors.neutral, 0.3),
    },
    subtle: {
      color: colors.palette.neutrals[9],
      backgroundColor: colors.palette.neutrals[2],
      borderColor: colors.transparent.light[5],
    },
  },
}

const stateSkins = {
  highlight: {
    color: colors.primary,
    backgroundColor: colors.overlay,
    borderColor: colors.palette.accents[5],
    boxShadow: "0 0 0 3px " + getTransparent(colors.palette.accents[3], 0.8),
  },
  focused: {
    borderColor: colors.palette.accents[7],
    boxShadow:
      "inset 0 0 0 2px " + getTransparent(colors.palette.neutrals[7], 0.8),
  },
  minimal: {
    backgroundColor: colors.surface,
    borderColor: colors.palette.neutrals[8],
    color: colors.light,
  },
  outlined: {
    borderColor: colors.palette.accents[5],
    boxShadow: "0 0 0 3px " + getTransparent(colors.palette.accents[3], 0.8),
  },
}

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
    borderColor: colors.transparent.light[2],
    shade: {
      backgroundColor: getShade(colors.surface, 0.05),
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
    borderColor: colors.transparent.light[2],
    shade: {
      backgroundColor: getShade(colors.card, 0.25),
      borderColor: colors.transparent.light[1],
    },
    tint: {
      backgroundColor: getTint(colors.card, 0.025),
      borderColor: colors.transparent.light[1],
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
}

const specialSkins = {
  transparent: {
    color: colors.secondary,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  translucent: {
    borderColor: colors.transparent.light[2],
    backdropFilter: "blur(8px)",
    "-webkit-backdrop-filter": "blur(8px)",
    backgroundColor: getTransparent(colors.white, 0.8),
    color: colors.primary,
    light: {
      borderColor: colors.transparent.light[2],
      backdropFilter: "blur(8px)",
      "-webkit-backdrop-filter": "blur(8px)",
      backgroundColor: getTransparent(colors.white, 0.4),
      color: colors.primary,
    },
    dark: {
      borderColor: colors.transparent.dark[2],
      backdropFilter: "blur(8px)",
      "-webkit-backdrop-filter": "blur(8px)",
      backgroundColor: getTransparent(colors.black, 0.7),
      color: colors.white,
    },
  },
  gradient: {
    backgroundImage: `linear-gradient(to bottom, ${colors.palette.blues[1]} 50%, ${colors.palette.yellows[1]} 100%)`,
  },
}

const hoverSkins = {
  default: {
    color: colors.light,
    backgroundColor: colors.palette.darks[4],
  },
  subtle: {
    backgroundColor: getTransparent(colors.brand, 0.05),
    color: colors.light,
  },
  dim: {
    backgroundColor: getTransparent(colors.black, 0.05),
    color: colors.light,
  },
  brand: {
    color: colors.dark,
    backgroundColor: colors.palette.brands[7],
    light: {
      color: colors.light,
      backgroundColor: colors.palette.brands[0],
    },
  },
  error: {
    color: colors.palette.reds[0],
    backgroundColor: colors.palette.reds[8],
  },
  success: {
    color: colors.palette.greens[0],
    backgroundColor: colors.palette.greens[8],
  },
}

const colorPairs = {
  ...staticPairs,
  ...specialSkins,
  ...signalPairs,
  ...surfaceSkins,
  ...stateSkins,
  dark: surfaceSkins.base,
  hover: hoverSkins,
}

const skins = {
  ...colorPairs,
  button: {
    default: {
      color: colors.secondary,
      backgroundColor: colors.transparent.dark[8],
      border: "1px solid",
      borderColor: colors.transparent.light[2],
      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      "&:hover": {
        ...hoverSkins.brand,
        boxShadow: "0 2px 0 0 rgba(0,0,0,0.04)",
      },
      surface: {
        color: colors.secondary,
        backgroundColor: colors.surface,
        border: "1px solid",
        borderColor: colors.transparent.light[3],
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.05)",
        "&:hover": {
          ...hoverSkins.subtle,
          boxShadow: "0 2px 0 0 rgba(0,0,0,0.04)",
        },
      },
      danger: {
        color: colors.palette.reds[8],
        border: "1px solid",
        backgroundColor: getTransparent(colors.red, 0.075),
        borderColor: colors.transparent.light[2],
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "&:hover": {
          ...hoverSkins.error,
          boxShadow: "0 2px 0 0 rgba(0,0,0,0.04)",
        },
      },
      success: {
        color: colors.secondary,
        border: "1px solid",
        backgroundColor: getTransparent(colors.green, 0.25),
        borderColor: colors.transparent.light[2],
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "&:hover": {
          ...hoverSkins.success,
          boxShadow: "0 2px 0 0 rgba(0,0,0,0.04)",
        },
      },
    },
    active: {
      color: colors.palette.brands[10],
      backgroundColor: colors.transparent.brand[3],
      border: "1px solid",
      borderColor: "transparent",
      "&:hover": {
        color: colors.primary,
        backgroundColor: colors.transparent.light[2],
        boxShadow: "0 2px 0 0 rgba(0,0,0,0.04)",
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
      dark: {
        color: colors.dark,
        border: "1px solid",
        backgroundColor: "transparent",
        borderColor: colors.transparent.dark[5],
        "&:hover": {
          ...hoverSkins.brand,
        },
      },
    },
    solid: {
      backgroundColor: colors.white,
      border: "none",
      borderColor: "transparent",
      color: colors.primary,
      boxShadow: shadows.medium,
      "&:hover": {
        //transform: "scale(1.05)",
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
        color: colors.secondary,
        "&:hover": {
          ...hoverSkins.default,
        },
      },
      dim: {
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "transparent",
        color: colors.tertiary,
        "&:hover": {
          ...hoverSkins.dim,
        },
      },
    },
    subtle: {
      backgroundColor: colors.base,
      border: "1px solid",
      borderColor: "transparent",
      color: colors.tertiary,
      "&:hover": {
        ...hoverSkins.default,
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
      color: colors.white,
      backgroundColor: colors.palette.brands[6],
      border: "1px solid",
      borderColor: colors.palette.brands[7],
      boxShadow:
        "0 2px 2px 0 rgba(0,0,0,0.072), 0 0px 10px 2px rgba(0,0,0,0.082)",
      "&:hover": {
        ...hoverSkins.brand,
      },
      subtle: {
        color: colors.palette.brands[11],
        backgroundColor: colors.transparent.brand[2],
        border: "1px solid",
        borderColor: colors.palette.brands[3],
        boxShadow:
          "0 2px 2px 0 rgba(0,0,0,0.072), 0 0px 10px 2px rgba(0,0,0,0.082)",
        "&:hover": {
          ...hoverSkins.brand,
        },
      },
    },
    tab: {
      color: colors.primary,
      backgroundColor: colors.surface,
      boxShadow: "none",
      borderBottom: "2px solid",
      borderBottomColor: "transparent",
      "&:hover": {
        ...hoverSkins.subtle,
        borderBottomColor: colors.palette.brands[3],
      },
      "&[data-active='true']": {
        backgroundColor: colors.palette.brands[0],
        borderBottomColor: colors.palette.brands[7],
        color: colors.palette.brands[10],
      },
    },
    segment: {
      border: "1px solid",
      backgroundColor: colors.surface,
      color: colors.primary,
      borderColor: colors.transparent.light[3],
      ...shadows.xsmall,
      "&:hover": {
        backgroundColor: colors.surface,
        color: colors.primary,
        borderColor: colors.transparent.light[4],
      },
    },
    success: {
      ...colorPairs.success.static,
      "&:hover": {
        ...colorPairs.success.interactive,
      },
    },
    warning: {
      ...colorPairs.warning.static,
      "&:hover": {
        ...colorPairs.warning.interactive,
      },
    },
    danger: {
      ...colorPairs.error.static,
      "&:hover": {
        ...colorPairs.error.interactive,
      },
    },
    sizes: {
      xxxsmall: {
        ...controlSizes.xxxsmall,
        fontSize: fontSizes[3],
        fontWeight: 600,
      },
      xxsmall: {
        ...controlSizes.xxsmall,
        fontSize: fontSizes[3],
        fontWeight: 600,
      },
      xsmall: {
        ...controlSizes.xsmall,
        fontSize: fontSizes[3],
        fontWeight: 600,
      },
      small: {
        ...controlSizes.small,
        fontSize: fontSizes[3],
        fontWeight: 600,
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
          width: space[10],
          height: space[10],
        },
      },
    },
  },
  field: {
    default: {
      border: "1px solid",
      backgroundColor: surfaceSkins.base.backgroundColor,
      color: colors.light,
      borderColor: colors.palette.neutrals[5],
      "&:hover, &:focus, &:focus-within": {
        backgroundColor: colors.palette.neutrals[0],
        borderColor: colors.palette.neutrals[8],
        color: colors.light,
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.05)",
      },
      "&::placeholder": {
        opacity: 0.6,
      },
      "&:focus": {
        outline: "none",
        borderColor: colors.palette.brands[8],
      },
    },
    primary: {
      border: "1.5px solid",
      backgroundColor: getTint(colors.brand, 0.9),
      color: colors.primary,
      borderColor: colors.palette.neutrals[6],
      boxShadow: "0 2px 0px 0 rgba(0,0,0,0.025) inset",

      "&:hover, &:focus": {
        backgroundColor: colors.surface,
        color: colors.primary,
        borderColor: colors.palette.neutrals[7],
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.05)",
      },
      // "&:invalid": {
      //   borderColor: colors.palette.reds[4],
      //   color: colors.light,
      // },
      "&::placeholder": {
        opacity: 0.8,
      },
      "&:focus": {
        outline: "none",
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
        color: colors.primary,
      },
      dark: {
        border: "0px solid",
        backgroundColor: "transparent",
        color: colors.dark,
        borderColor: "transparent",
        borderRadius: 0,
        "&:hover, &:focus": {
          borderColor: "transparent",
          color: colors.dark,
          outline: "none",
        },
        "&:user-invalid, &:invalid:not(:placeholder-shown)": {
          borderColor: colors.palette.reds[4],
          color: colors.palette.reds[4],
        },
      },
    },
    outline: {
      border: "1px solid",
      backgroundColor: colors.surface,
      color: colors.primary,
      borderColor: colors.palette.neutrals[7],
      boxShadow: "0 2px 0px 0 rgba(0,0,0,0.05) inset",
      "&:hover, &:focus": {
        borderColor: colors.palette.neutrals[8],
        color: colors.primary,
        outline: "none",
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.primary,
      },
      required: {
        border: "1px solid",
        backgroundColor: colors.transparent.light[0],
        color: colors.primary,
        borderColor: colors.palette.reds[7],
        boxShadow: "0 2px 0px 0 rgba(0,0,0,0.025) inset",
        "&:hover, &:focus": {
          borderColor: colors.palette.reds[8],
          color: colors.primary,
          outline: "none",
        },
        "&:user-invalid, &:invalid:not(:placeholder-shown)": {
          borderColor: colors.palette.reds[4],
          backgroundColor: colors.palette.reds[0],
          color: colors.primary,
        },
      },
      prefilled: {
        border: "1px solid",
        backgroundColor: colors.transparent.accent[2],
        color: colors.primary,
        borderColor: colors.palette.accents[6],
        boxShadow: "0 2px 0px 0 rgba(0,0,0,0.05) inset",
        "&:hover, &:focus": {
          borderColor: colors.palette.accents[8],
          backgroundColor: colors.transparent.accent[0],
          color: colors.primary,
          outline: "none",
        },
        "&:user-invalid, &:invalid:not(:placeholder-shown)": {
          borderColor: colors.palette.reds[4],
          backgroundColor: colors.palette.reds[0],
          color: colors.primary,
        },
      },
    },
    underline: {
      border: "1px dashed",
      borderWidth: "0px 0px 1.5px 0px",
      backgroundColor: "transparent",
      color: colors.primary,
      borderColor: colors.palette.neutrals[4],
      "&:hover, &:focus": {
        borderColor: "transparent",
        backgroundColor: colors.palette.brands[0],
        color: colors.primary,
        outline: "none",
      },
      "&:user-invalid, &:invalid:not(:placeholder-shown)": {
        borderColor: colors.palette.reds[4],
        color: colors.primary,
      },
      required: {
        border: "1px solid",
        backgroundColor: colors.transparent.light[0],
        color: colors.primary,
        borderColor: colors.palette.reds[7],
        boxShadow: "0 2px 0px 0 rgba(0,0,0,0.025) inset",
        "&:hover, &:focus": {
          borderColor: colors.palette.reds[8],
          color: colors.primary,
          outline: "none",
        },
        "&:user-invalid, &:invalid:not(:placeholder-shown)": {
          borderColor: colors.palette.reds[4],
          backgroundColor: colors.palette.reds[0],
          color: colors.primary,
        },
      },
      prefilled: {
        border: "1px solid",
        backgroundColor: colors.transparent.accent[2],
        color: colors.primary,
        borderColor: colors.palette.accents[6],
        boxShadow: "0 2px 0px 0 rgba(0,0,0,0.05) inset",
        "&:hover, &:focus": {
          borderColor: colors.palette.accents[8],
          backgroundColor: colors.transparent.accent[0],
          color: colors.primary,
          outline: "none",
        },
        "&:user-invalid, &:invalid:not(:placeholder-shown)": {
          borderColor: colors.palette.reds[4],
          backgroundColor: colors.palette.reds[0],
          color: colors.primary,
        },
      },
    },
    select: {
      border: "1px solid",
      backgroundColor: colors.surface,
      color: colors.primary,
      borderColor: colors.palette.neutrals[7],
      boxShadow: "0 -2px 0px 0 rgba(0,0,0,0.025) inset",

      "&:hover, &:focus": {
        backgroundColor: colors.card,
        color: colors.primary,
        borderColor: colors.palette.brands[8],
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.05)",
      },
      // "&:invalid": {
      //   borderColor: colors.palette.reds[4],
      //   color: colors.light,
      // },
      "&::placeholder": {
        opacity: 0.8,
      },
      "&:focus": {
        outline: "none",
      },
    },
    checked: {
      border: "1px solid",
      backgroundColor: colors.palette.neutrals[2],
      color: colors.light,
      borderColor: colors.palette.neutrals[7],
      "&:hover, &:focus": {
        backgroundColor: colors.palette.neutrals[0],
        borderColor: colors.palette.accents[8],
        color: colors.light,
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
        prefix: {
          paddingLeft: space.xl,
          paddingRight: space.s,
          paddingTop: space.xxxsmall,
          paddingBottom: space.xxxsmall,
          fontSize: fontSizes[3],
          fontWeight: 400,
        },
      },
      medium: {
        //...controlSizes.medium,
        paddingLeft: space.s,
        paddingRight: space.s,
        paddingTop: space.xsmall,
        paddingBottom: space.xsmall,
        fontSize: fontSizes[4],
        fontWeight: 400,
        prefix: {
          paddingLeft: space.xxl,
          paddingRight: space.s,
          paddingTop: space.xsmall,
          paddingBottom: space.xsmall,
          fontSize: fontSizes[4],
          fontWeight: 400,
        },
      },
      large: {
        // height: space[15],
        paddingLeft: space.s,
        paddingRight: space.s,
        paddingTop: space.xsmall,
        paddingBottom: space.xsmall,
        fontSize: fontSizes[5],
        fontWeight: 400,
        prefix: {
          //paddingLeft: space.xxs,
          paddingRight: space.s,
          paddingTop: space.xsmall,
          paddingBottom: space.xsmall,
          fontSize: fontSizes[5],
          fontWeight: 400,
        },
      },
    },
  },
  link: {
    default: {
      color: colors.palette.brands[8],
      textDecoration: "underline",
      textDecorationColor: colors.transparent.brand[5],
      textDecorationThickness: "1px",
    },
    highlight: {
      color: colors.palette.brands[6],
    },
    underline: {
      color: colors.palette.brands[7],
      textDecoration: "underline",
      textDecorationColor: colors.palette.brands[1],
      textDecorationThickness: "1.5px",
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
    border: "1px solid",
    color: colors.light,
    backgroundColor: colors.overlay,
    borderColor: colors.transparent.light[2],
    "&:hover, &:focus, &:focus-within": {
      ...stateSkins.highlight,
      // backgroundColor: colors.card,
      // borderColor: colors.palette.brands[5],
      // color: colors.light,
      // boxShadow: "0 0 0 3px " + getTransparent(colors.palette.brands[4], 0.125),
    },
    "& *::placeholder": {
      opacity: 0.6,
    },
    "&:focus": {
      outline: "none",
    },
  },
  codeblock: {
    backgroundColor: colors.card,
    color: colors.light,
    highlight: {
      color: colors.palette.yellows[11],
      backgroundColor: colors.palette.yellows[1],
      "& > code": {
        backgroundColor: "transparent",
      },
    },
  },
  row: {
    backgroundColor: colors.surface,
    color: colors.primary,
    borderColor: colors.palette.neutrals[5],
    empty: {
      backgroundColor: colors.palette.neutrals[2],
      color: colors.primary,
      borderColor: colors.palette.neutrals[5],
    },
    selected: {
      backgroundColor: colors.palette.blues[0],
      color: colors.primary,
      borderColor: colors.palette.neutrals[5],
      "&:hover, &:focus": {
        backgroundColor: colors.palette.darks[0],
        color: colors.primary,
        borderColor: colors.palette.neutrals[5],
      },
    },
    clean: {
      backgroundColor: "transparent",
      color: colors.primary,
      borderColor: colors.palette.neutrals[5],
    },
    group: {
      backgroundColor: colors.palette.neutrals[1],
      color: colors.secondary,
    },
    header: {
      backgroundColor: colors.palette.neutrals[1],
      color: colors.secondary,
    },
    alt: {
      backgroundColor: colors.palette.neutrals[1],
      color: colors.secondary,
      borderColor: colors.palette.neutrals[3],
    },
  },
  cell: {
    ...signalPairs.error,
  },
  danger: {
    backgroundColor: colors.danger,
    color: colors.primary,
  },
}

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
}

export default skinconfig
