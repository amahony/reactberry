import React from 'react';
import {ThemeProvider as StyledProvider} from 'styled-components';
import defaultTheme, {GlobalStyle} from './default';

export const ThemeContext = React.createContext(defaultTheme);

export function ThemeProvider({children, theme = defaultTheme}) {
  const resolvedTheme = React.useMemo(() => theme || defaultTheme, [theme]);

  return (
    <ThemeContext.Provider value={resolvedTheme}>
      <StyledProvider theme={resolvedTheme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
export {defaultTheme, GlobalStyle};
