import React from 'react';

import {GlobalStyle, ThemeProvider, defaultTheme} from '@reactberry/core/theme';

function ReactberryStarterApp({Component, pageProps}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default ReactberryStarterApp;