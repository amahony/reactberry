import chroma from 'chroma-js';

// Definition of available colors from the spectre in hsl(0-360, 0-1, 0-1)
const spectre = {
  white: chroma.hsl(0, 0, 1),
  black: chroma.hsl(0, 0, 0),
  red: chroma.hsl(3, 1, 0.6),
  orange: chroma.hsl(35, 1, 0.6),
  yellow: chroma.hsl(48, 1, 0.6),
  green: chroma.hsl(129, 0.5, 0.6),
  teal: chroma.hsl(175, 0.67, 0.5),
  blue: chroma.hsl(211, 1, 0.5),
  purple: chroma.hsl(280, 0.67, 0.6),
  pink: chroma.hsl(349, 1, 0.6)
};

const Color = chroma.hsl(214, 1, 0.2);
// Construct base system color to be used in UI
const systemColor = chroma(Color)
  .set('hsl.s', 0.25)
  .set('hsl.l', 0.5);

const system = {
  brand: Color,
  accent: spectre.blue,
  neutral: systemColor,
  light: chroma(systemColor).set('hsl.l', 0.96),
  dark: chroma(systemColor).set('hsl.l', 0.16),
  gray: systemColor,
  slategray: chroma.mix(Color, systemColor, 0.7),
  red: chroma.mix(spectre.red, Color, 0.125),
  orange: chroma.mix(spectre.orange, Color, 0.125),
  yellow: chroma.mix(spectre.yellow, Color, 0.25),
  green: chroma.mix(spectre.green, Color, 0.125),
  teal: chroma.mix(spectre.teal, Color, 0.25),
  blue: chroma.mix(spectre.blue, Color, 0.25),
  purple: chroma.mix(spectre.purple, Color, 0.25),
  pink: chroma.mix(spectre.pink, Color, 0.25)
};

const intent = {
  action: system.accent,
  success: system.green,
  danger: system.red,
  warning: system.yellow
};

const scales = {};
Object.keys(system).map(function(item) {
  scales[item + 's'] = chroma
    .scale([spectre.white, system[item], spectre.black])
    .domain([0, 0.5, 1])
    .mode('lab')
    .padding([0.05, 0.2])

    .colors(10);
  return scales;
});

const intents = {};
Object.keys(intent).map(function(item) {
  intents[item] = chroma
    .scale([spectre.white, intent[item], spectre.black])
    .correctLightness()
    .domain([0, 0.5, 1])
    .mode('lab')
    .padding([0.05, 0.2])
    .colors(7);
  return intents;
});

const colors = {
  ...system,
  palette: {
    ...scales
  },
  intents: {
    ...intents
  },
  white: spectre.white,
  black: spectre.black,
  primary: scales.grays[8],
  secondary: scales.grays[6],
  tertiary: scales.grays[4],
  //
  action: intent.action,
  success: intent.success,
  danger: intent.danger,
  warning: intent.warning
};
export default colors;
