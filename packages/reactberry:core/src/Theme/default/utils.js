import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", "Ubuntu", sans-serif;
  padding: 0;
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "pnum";
  font-variant-numeric: proportional-nums;
}
`;

export default GlobalStyle;
