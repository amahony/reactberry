import colors from './colors';
import {buttonSizes, skeletonSizes, tagSizes} from './controls';
import {radii} from './radii';
import shadows from './shadows';

export const colorStyles = {
  default: {
    color: colors.text.default,
    backgroundColor: colors.surface.default
  },
  light: {
    color: colors.text.default,
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
    color: colors.palette.yellows[7],
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

export const buttonStyles = {
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
        color: colors.palette.yellows[8],
        backgroundColor: colors.intents.warning[1],
        '&:hover': {
          color: colors.palette.yellows[9],
          backgroundColor: colors.intents.warning[2]
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
    borderColor: colors.border.default,
    boxShadow: shadows.small,
    '&:hover': {
      color: colors.palette.blues[5],
      borderColor: colors.palette.brands[2],
      backgroundColor: colors.white,
      boxShadow: '0 3px 3px -3px rgba(15, 23, 42, 0.2)'
    },
    intents: {
      action: {
        color: colors.white,
        backgroundColor: colors.palette.blues[4],
        boxShadow: shadows.small,
        '&:hover': {
          color: colors.white,
          backgroundColor: colors.palette.blues[5],
          borderColor: colors.palette.blues[6],
          boxShadow: '0 3px 3px -3px rgba(15, 23, 42, 0.2)'
        }
      },
      success: {
        color: colors.white,
        backgroundColor: colors.success,
        '&:hover': {
          color: colors.white,
          backgroundColor: colors.palette.greens[6]
        }
      },
      danger: {
        color: colors.white,
        backgroundColor: colors.palette.reds[5],
        '&:hover': {
          color: colors.white,
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
  buttonSizes
};

export const layoutStyles = {
  horizontal: {flexDirection: 'row'},
  vertical: {flexDirection: 'column'}
};

export const skeletonStyles = {
  default: {backgroundColor: colors.palette.grays[2]},
  alt: {backgroundColor: colors.palette.grays[5]},
  clean: {backgroundColor: 'currentColor'},
  skeletonSizes,
  skeletonTypes: {
    card: {height: '2rem', width: '2rem'},
    circle: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: radii.circle,
      xsmall: {height: '1.5rem', width: '1.5rem', borderRadius: radii.circle},
      small: {height: '2rem', width: '2rem', borderRadius: radii.circle}
    },
    rounded: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: radii.medium,
      small: {height: '2rem', width: '2rem'}
    },
    button: {height: '2.5rem', width: '5rem'}
  }
};

export const tagStyles = {
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
  tagSizes
};

export const presets = {
  default: {
    color: colors.text.default,
    backgroundColor: colors.surface.default
  },
  light: {
    color: colors.text.default,
    backgroundColor: colors.surface.default,
    borderRadius: radii.medium,
    border: '1px solid',
    borderColor: colors.light
  },
  success: {
    color: colors.white,
    backgroundColor: colors.success,
    borderRadius: radii.medium,
    border: '1px solid',
    borderColor: colors.intents.success[4]
  }
};