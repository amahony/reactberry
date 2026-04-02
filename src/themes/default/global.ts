"use client";
import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
    :root {
        --primary: ${(p: any) => p.theme.colors.transparent.light[2] || "rgba(0, 0, 0, 0.7)"};
        --secondary: rgba(0, 0, 0, 0.4);
        --tertiary: rgba(0, 0, 0, 0.1);
        --code: ${(p) => p.theme.colors.transparent.light[2]};
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html,
    body {
        min-height: 100dvh;
        background-color: ${(p: any) => p.theme.colors?.palette?.neutrals?.[3] || p.theme.colors.neutral || "white"};
    }

    *:empty {
        gap: unset;
    }
    body {
        font-family:
            var(--main-font),
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol";
        padding: 0;
        margin: 0;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "pnum";
        font-variant-numeric: proportional-nums;
    }
    img,
    picture,
    video,
    canvas {
        max-width: 100%;
        max-height: 100%;
    }
    iframe {
        outline: none;
        border: none;
    }

    table {
        border-collapse: collapse;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    /*
  a:visited {
    color: inherit;
  }
 a[href^="/"] {
    color: inherit;
  }
   */
    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    p,
    figure {
        margin: 0;
    }
    p > code {
        background: var(--code);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 15px;
        font-weight: 600;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
    }

    #root,
    #__next {
        isolation: isolate;
    }

    /* Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: var(--secondary) transparent;
    }

    /* Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 10px;
        height: 6px;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 5px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: var(--secondary);
        border-radius: 1ex;
        height: 4px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background-color: var(--primary);
    }

    ::-webkit-scrollbar-corner {
        background: var(--tertiary);
    }
`;

export default GlobalStyles;
