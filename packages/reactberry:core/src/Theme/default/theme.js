import {
  avatarSizes,
  badgeSizes,
  breakpoints,
  fontSizes,
  headingSizes,
  iconSizes,
  space,
  switchSizes,
  textSizes
} from './space';
import GlobalStyle from './utils';
import colors from './colors';

const colorStyles = {
  default: {
    color: colors.primary,
    backgroundColor: colors.white
  },
  light: {
    color: colors.primary,
    backgroundColor: colors.light
  },
  purple: {
    color: colors.palette.purples[6],
    backgroundColor: colors.palette.purples[0]
  },
  red: {
    color: colors.palette.reds[6],
    backgroundColor: colors.palette.reds[0]
  },
  orange: {
    color: colors.palette.oranges[6],
    backgroundColor: colors.palette.oranges[0]
  },
  yellow: {
    color: colors.palette.yellows[6],
    backgroundColor: colors.palette.yellows[0]
  },
  green: {
    color: colors.palette.greens[6],
    backgroundColor: colors.palette.greens[0]
  },
  teal: {
    color: colors.palette.teals[6],
    backgroundColor: colors.palette.teals[0]
  },
  blue: {
    color: colors.palette.blues[6],
    backgroundColor: colors.palette.blues[0]
  },
  pink: {
    color: colors.palette.pinks[6],
    backgroundColor: colors.palette.pinks[0]
  },
  gray: {
    color: colors.palette.grays[6],
    backgroundColor: colors.palette.grays[0]
  }
};

const radius = ['0px', '2px', '3px', '4px', '6px', '8px', '16px', '32px', '50%'];
// Radius alias
radius.none = radius[0];
radius.rounded = radius[5];
radius.pill = radius[6];
radius.circle = radius[8];

const radii = {...radius};

radii.none = radius[0];
radii.rounded = radius[5];
radii.pill = radius[6];
radii.circle = radius[8];

const shapes = {
  square: {'border-radius': radius.none},
  rounded: {'border-radius': radius.rounded},
  circle: {'border-radius': radius.circle, padding: '0'},
  roundedTop: {
    'border-top-left-radius': radius.rounded,
    'border-top-right-radius': radius.rounded
  }
};

const fontFamily = {
  default: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', sans-serif",
  monospace: 'monospace'
};

const buttonStyles = {
  default: {
    color: colors.palette.grays[8],
    backgroundColor: colors.palette.grays[0],
    border: '1px solid',
    borderColor: 'transparent',
    '&:hover': {
      color: colors.palette.grays[8],
      backgroundColor: colors.palette.grays[1]
    },
    intents: {
      action: {
        color: colors.intents.action[0],
        backgroundColor: colors.intents.action[3],
        '&:hover': {
          color: colors.intents.action[0],
          backgroundColor: colors.intents.action[4]
        }
      },
      success: {
        color: colors.white,
        backgroundColor: colors.intents.success[3],
        '&:hover': {
          color: colors.intents.success[0],
          backgroundColor: colors.intents.success[4]
        }
      },
      danger: {
        color: colors.intents.danger[0],
        backgroundColor: colors.intents.danger[3],
        '&:hover': {
          color: colors.intents.danger[0],
          backgroundColor: colors.intents.danger[4]
        }
      },
      warning: {
        color: colors.intents.warning[3],
        backgroundColor: colors.intents.warning[1],
        '&:hover': {
          color: colors.intents.warning[0],
          backgroundColor: colors.intents.warning[3]
        }
      }
    }
  },
  darker: {
    color: colors.palette.grays[8],
    backgroundColor: colors.palette.grays[1],
    '&:hover': {
      color: colors.palette.grays[8],
      backgroundColor: colors.palette.grays[2]
    }
  },
  primary: {
    color: colors.palette.grays[7],
    backgroundColor: colors.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0, .125)',
    boxShadow: '0 3px 3px -3px hsla(0, 0%, 0%, 0.2), inset 0 -4px 8px -8px hsla(0, 0%, 0%, 0.3)',
    '&:hover': {
      color: colors.palette.blues[5],
      borderColor: colors.palette.brands[2],
      backgroundColor: '',
      boxShadow: '0 3px 3px -3px hsla(0, 0%, 0%, 0.2)'
    },
    intents: {
      action: {
        color: colors.white,
        backgroundColor: colors.palette.blues[4],
        boxShadow: '0 3px 3px -3px hsla(0, 0%, 0%, 0.2), inset 0 -4px 8px -8px hsla(0, 0%, 0%, 0.3)',
        '&:hover': {
          color: colors.white,
          backgroundColor: colors.palette.blues[5],
          borderColor: colors.palette.blues[6],
          boxShadow: '0 3px 3px -3px hsla(0, 0%, 0%, 0.2)'
        }
      },
      success: {
        color: 'white',
        backgroundColor: colors.success,
        '&:hover': {
          color: 'white',
          backgroundColor: colors.palette.greens[6]
        }
      },
      danger: {
        color: 'white',
        backgroundColor: colors.palette.reds[5],
        '&:hover': {
          color: 'white',
          backgroundColor: colors.palette.reds[6]
        }
      }
    }
  },
  minimal: {
    color: colors.palette.grays[6],
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: colors.palette.grays[1]
    },
    intents: {
      action: {
        color: colors.action,
        backgroundColor: colors.white,
        '&:hover': {
          backgroundColor: colors.palette.blues[0]
        }
      },
      success: {
        color: colors.success,
        backgroundColor: colors.white,
        '&:hover': {
          backgroundColor: colors.palette.greens[0]
        }
      },
      danger: {
        color: colors.danger,
        backgroundColor: colors.white,
        '&:hover': {
          backgroundColor: colors.palette.reds[0]
        }
      }
    }
  },
  outline: {
    color: colors.palette.grays[6],
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: colors.palette.grays[2],
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: colors.palette.grays[1]
    },
    intents: {
      action: {
        color: colors.action,
        backgroundColor: 'transparent'
      },
      success: {
        color: colors.success,
        backgroundColor: 'transparent'
      },
      danger: {
        border: '1px solid',
        borderColor: colors.palette.reds[0],
        color: colors.palette.reds[6],
        backgroundColor: 'transparent'
      }
    }
  },
  custom: {
    '&:hover': {},
    intents: {
      action: {
        color: colors.action,
        backgroundColor: 'transparent'
      },
      success: {
        color: colors.success,
        backgroundColor: 'transparent'
      },
      danger: {
        color: colors.danger,
        backgroundColor: 'transparent'
      }
    }
  },
  buttonSizes: {
    xsmall: {
      fontSize: fontSizes[2],
      padding: '0 .75rem',
      height: '1.75rem',
      lineHeight: '1.75rem'
    },
    small: {
      fontSize: fontSizes[3],
      padding: '0 .875rem',
      height: '2rem',
      lineHeight: '2rem'
    },
    medium: {
      fontSize: fontSizes[3],
      padding: '0 1rem',
      height: '2.5rem',
      lineHeight: '2.5rem'
    },
    large: {
      fontSize: fontSizes[6],
      padding: '0 1.5rem',
      height: '2.75rem',
      lineHeight: '2.75rem'
    },
    custom: {}
  }
};

const layoutStyles = {
  horizontal: {flexDirection: 'row'},
  vertical: {flexDirection: 'column'}
};

const skeletonStyles = {
  default: {backgroundColor: colors.palette.grays[2]},
  alt: {backgroundColor: colors.palette.grays[5]},
  clean: {backgroundColor: 'currentColor'},
  skeletonSizes: {
    xsmall: {height: '.5rem'},
    small: {height: '.75rem'},
    medium: {height: '1rem'},
    large: {height: '2rem'},
    xlarge: {height: '4rem'},
    xxlarge: {height: '8rem'}
  },
  skeletonTypes: {
    card: {height: '2rem', width: '2rem'},
    circle: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '50%',
      xsmall: {height: '1.5rem', width: '1.5rem', borderRadius: '50%'},
      small: {height: '2rem', width: '2rem', borderRadius: '50%'}
    },
    rounded: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '8px',
      small: {height: '2rem', width: '2rem'}
    },
    button: {height: '2.5rem', width: '5rem'}
  }
};

const tagStyles = {
  ...colorStyles,
  default: colorStyles.gray,
  priority: {
    ...colorStyles.gray,
    status: {
      low: colorStyles.blue,
      medium: colorStyles.orange,
      high: colorStyles.red
    }
  },
  intent: {
    ...colorStyles.gray,
    status: {
      action: colorStyles.blue,
      warning: colorStyles.orange,
      danger: colorStyles.red,
      success: colorStyles.green
    }
  },
  tagSizes: {
    xsmall: {
      fontSize: fontSizes[0],
      padding: '0 .5rem',
      height: '17px',
      lineHeight: '1',
      fontWeight: 900
    },
    small: {
      fontSize: fontSizes[1],
      padding: '0 .5rem',
      height: '21px',
      lineHeight: '1',
      fontWeight: 700
    },
    medium: {
      fontSize: fontSizes[2],
      padding: '0 .75rem',
      height: '25px',
      lineHeight: '1',
      fontWeight: 700
    },
    large: {
      fontSize: fontSizes[3],
      padding: '0 1rem',
      height: '29px',
      lineHeight: '1',
      fontWeight: 700
    },
    custom: {}
  }
};

const presets = {
  default: {
    color: colors.primary,
    backgroundColor: colors.white
  },
  light: {
    color: colors.primary,
    backgroundColor: colors.white,
    borderRadius: radius.rounded,
    border: '1px solid',
    borderColor: colors.light
  },
  success: {
    color: colors.white,
    backgroundColor: colors.success,
    borderRadius: radius.rounded,
    border: '1px solid',
    borderColor: colors.intents.success[4]
  }
};

const shadowStyles = {
  none: {
    boxShadow: '0px 0px 0px rgba(0,0,0,0.125)'
  },
  small: {
    boxShadow: '0px 2px 8px rgba(0,0,0,0.125)'
  },
  medium: {
    boxShadow: '0px 8px 16px rgba(0,0,0,0.125)'
  }
};

const theme = {
  colors,
  breakpoints,
  space,
  radius,
  radii,
  shapes,
  fontFamily,
  fontSizes,
  iconSizes,
  textSizes,
  headingSizes,
  buttonStyles,
  layoutStyles,
  skeletonStyles,
  avatarSizes,
  badgeSizes,
  switchSizes,
  tagStyles,
  colorStyles,
  presets,
  shadowStyles
};

export default theme;
export {GlobalStyle};
