export const radii = [
  "0px",
  "2px",
  "3px",
  "4px",
  "6px",
  "8px",
  "12px",
  "16px",
  "32px",
  "50%",
];

export const shapes = {
  square: { "border-radius": radii[0] },
  roundedSmall: { "border-radius": radii[3] },
  rounded: { "border-radius": radii[5] },
  roundedLarge: { "border-radius": radii[7] },
  pill: { "border-radius": radii[8] },
  circle: { "border-radius": radii[9] },
  roundedTop: {
    "border-top-left-radius": radii[4],
    "border-top-right-radius": radii[4],
  },
  roundedBottom: {
    "border-bottom-left-radius": radii[4],
    "border-bottom-right-radius": radii[4],
  },
  roundedLeft: {
    "border-top-left-radius": radii[4],
    "border-bottom-left-radius": radii[4],
  },
  roundedRight: {
    "border-top-right-radius": radii[4],
    "border-bottom-right-radius": radii[4],
  },
};
