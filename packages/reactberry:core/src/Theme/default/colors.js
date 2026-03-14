import chroma from 'chroma-js';

const WHITE = '#FFFFFF';
const BLACK = '#000000';

const seed = {
  brand: chroma.hsl(214, 0.9, 0.38),
  neutral: chroma.hsl(214, 0.16, 0.5),
  red: chroma.hsl(3, 1, 0.6),
  orange: chroma.hsl(35, 1, 0.6),
  yellow: chroma.hsl(48, 1, 0.6),
  green: chroma.hsl(129, 0.5, 0.6),
  teal: chroma.hsl(175, 0.67, 0.5),
  blue: chroma.hsl(211, 1, 0.5),
  purple: chroma.hsl(280, 0.67, 0.6),
  pink: chroma.hsl(349, 1, 0.6)
};

seed.accent = chroma(seed.blue);
seed.light = chroma(seed.neutral).set('hsl.l', 0.97);
seed.dark = chroma(seed.neutral).set('hsl.l', 0.16);
seed.gray = chroma(seed.neutral);
seed.slategray = chroma.mix(seed.brand, seed.neutral, 0.7, 'lab');

const toHex = color => chroma(color).hex();

const createScale = (color, options = {}) => {
  const {steps = 10, padding = [0.04, 0.14], correctLightness = false} = options;

  let scale = chroma
    .scale([WHITE, color, BLACK])
    .domain([0, 0.5, 1])
    .mode('lab')
    .padding(padding);

  if (correctLightness) {
    scale = scale.correctLightness();
  }

  return scale.colors(steps);
};

const palette = {
  brands: createScale(seed.brand, {correctLightness: true}),
  accents: createScale(seed.accent, {correctLightness: true}),
  grays: createScale(seed.gray, {padding: [0.04, 0.18], correctLightness: true}),
  neutrals: createScale(seed.neutral, {padding: [0.04, 0.18], correctLightness: true}),
  slategrays: createScale(seed.slategray, {padding: [0.04, 0.18], correctLightness: true}),
  reds: createScale(chroma.mix(seed.red, seed.brand, 0.125, 'lab'), {
    correctLightness: true
  }),
  oranges: createScale(chroma.mix(seed.orange, seed.brand, 0.125, 'lab'), {
    correctLightness: true
  }),
  yellows: createScale(chroma.mix(seed.yellow, seed.brand, 0.25, 'lab'), {
    padding: [0.02, 0.16],
    correctLightness: true
  }),
  greens: createScale(chroma.mix(seed.green, seed.brand, 0.125, 'lab'), {
    correctLightness: true
  }),
  teals: createScale(chroma.mix(seed.teal, seed.brand, 0.25, 'lab'), {
    correctLightness: true
  }),
  blues: createScale(chroma.mix(seed.blue, seed.brand, 0.25, 'lab'), {
    correctLightness: true
  }),
  purples: createScale(chroma.mix(seed.purple, seed.brand, 0.25, 'lab'), {
    correctLightness: true
  }),
  pinks: createScale(chroma.mix(seed.pink, seed.brand, 0.25, 'lab'), {
    correctLightness: true
  })
};

const intentSeeds = {
  action: seed.accent,
  success: chroma.mix(seed.green, seed.brand, 0.125, 'lab'),
  danger: chroma.mix(seed.red, seed.brand, 0.125, 'lab'),
  warning: chroma.mix(seed.yellow, seed.brand, 0.25, 'lab')
};

const intents = Object.keys(intentSeeds).reduce((collection, name) => {
  collection[name] = createScale(intentSeeds[name], {
    steps: 7,
    padding: [0.04, 0.12],
    correctLightness: true
  });

  return collection;
}, {});

const colors = {
  white: WHITE,
  black: BLACK,
  brand: toHex(seed.brand),
  accent: toHex(seed.accent),
  neutral: toHex(seed.neutral),
  light: toHex(seed.light),
  dark: toHex(seed.dark),
  gray: toHex(seed.gray),
  slategray: toHex(seed.slategray),
  red: toHex(intentSeeds.danger),
  orange: toHex(chroma.mix(seed.orange, seed.brand, 0.125, 'lab')),
  yellow: toHex(intentSeeds.warning),
  green: toHex(intentSeeds.success),
  teal: toHex(chroma.mix(seed.teal, seed.brand, 0.25, 'lab')),
  blue: toHex(chroma.mix(seed.blue, seed.brand, 0.25, 'lab')),
  purple: toHex(chroma.mix(seed.purple, seed.brand, 0.25, 'lab')),
  pink: toHex(chroma.mix(seed.pink, seed.brand, 0.25, 'lab')),
  primary: palette.grays[8],
  secondary: palette.grays[6],
  tertiary: palette.grays[4],
  action: toHex(intentSeeds.action),
  success: toHex(intentSeeds.success),
  danger: toHex(intentSeeds.danger),
  warning: toHex(intentSeeds.warning),
  text: {
    default: palette.grays[8],
    muted: palette.grays[6],
    subtle: palette.grays[5],
    inverse: WHITE
  },
  surface: {
    canvas: WHITE,
    default: WHITE,
    subtle: palette.grays[0],
    muted: palette.grays[1],
    sunken: palette.grays[2],
    inverse: palette.grays[8]
  },
  border: {
    subtle: palette.grays[1],
    default: palette.grays[2],
    strong: palette.grays[4],
    accent: palette.brands[3]
  },
  focus: {
    ring: chroma(seed.brand).alpha(0.24).css()
  },
  palette,
  intents,
  current: 'currentColor'
};

export default colors;
