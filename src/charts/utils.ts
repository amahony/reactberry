export const charttheme = {
  background: "transparent",
  fontFamily: "sans-serif",
  fontSize: 12,
  textColor: "#777777",
  axis: {
    domain: {
      line: {
        stroke: "transparent",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 2,
      },
      text: {},
    },
    legend: {
      text: {
        fontSize: 12,
        fontWeight: 600,
      },
    },
  },
  grid: {
    line: {
      stroke: "#333",
      strokeWidth: 1,
      strokeDasharray: "2 2",
    },
  },
  legends: {
    text: {
      fill: "#333333",
      fontSize: 12,
    },
  },
  labels: {
    text: { fontSize: 11, fill: "currentColor", fontWeight: 600 },
  },
  markers: {
    lineColor: "#ff0000",
    lineStrokeWidth: 1,
    lineStrokeDasharray: "4 4",
  },
  dots: {
    text: {},
  },
  tooltip: {
    container: {
      background: "black",
      color: "white",
      fontSize: "inherit",
      borderRadius: "8px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
      padding: "5px 9px",
    },
    basic: {
      whiteSpace: "pre",
      display: "flex",
      alignItems: "center",
    },
    table: {},
    tableCell: {
      padding: "3px 5px",
    },
  },
  crosshair: {
    line: {
      stroke: "#000000",
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: "6 6",
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
    outline: {
      fill: "none",
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
  },
};
