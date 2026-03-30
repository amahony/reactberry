export const shadows = {
  xxsmall: {
    "--shadow-color": "0deg 0% 50%",
    boxShadow: `
        0 1px 1px hsl(var(--shadow-color) / 0.0875),
        0 2px 2px hsl(var(--shadow-color) / 0.05)
      `,
  },
  xsmall: {
    "--shadow-color": "0deg 0% 50%",
    boxShadow: `
      0 1px 1px hsl(var(--shadow-color) / 0.125),
      0 2px 2px hsl(var(--shadow-color) / 0.125)
    `,
  },
  small: {
    "--shadow-color": "0deg 0% 50%",
    boxShadow: `
      0 2px 2px hsl(var(--shadow-color) / 0.125),
      0 0 4px hsl(var(--shadow-color) / 0.125)
    `,
  },
  medium: {
    "--shadow-color": "0deg 0% 50%",
    boxShadow: `
      0 2px 2px hsl(var(--shadow-color) / 0.25),
      0 4px 4px hsl(var(--shadow-color) / 0.125),
      0 6px 6px hsl(var(--shadow-color) / 0.125)
    `,
  },
  large: {
    "--shadow-color": "0deg 0% 50%",
    boxShadow: `
      0 2px 2px hsl(var(--shadow-color) / 0.125),
      0 4px 4px hsl(var(--shadow-color) / 0.125),
      0 8px 8px hsl(var(--shadow-color) / 0.125),
      0 16px 16px hsl(var(--shadow-color) / 0.125),
      0 24px 24px hsl(var(--shadow-color) / 0.125)
    `,
  },
};

// export const shadows = {
//   xsmall: {
//     "--shadow-color": "rgb(0 0 0 / 0.05);",
//     boxShadow: " 0px 2px 4px var(--shadow-color)",
//   },
//   small: {
//     "--shadow-color": "rgb(0 0 0 / 0.1);",
//     boxShadow:
//       " 0px 0px 0px 1px var(--shadow-color), 0px 1px 1px -0.5px var(--shadow-color),0px 3px 3px -1.5px var(--shadow-color),0px 6px 6px -3px var(--shadow-color)",
//   },
//   medium: {
//     "--shadow-color": "rgb(0 0 0 / 0.075);",
//     boxShadow:
//       "0px 6px 6px -3px var(--shadow-color), 0px 12px 12px -6px var(--shadow-color), 0px 24px 24px -12px var(--shadow-color);",
//   },
//   large: {
//     "--shadow-color": "rgb(0 0 0 / 0.12);",
//     boxShadow:
//       " 0px 0px 0px 0.5px var(--shadow-color), var(--shadow-color) 0px 50px 100px -20px, var(--shadow-color) 0px 30px 60px -30px;",
//   },
// };
