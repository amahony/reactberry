import React from 'react';
import {ThemeProvider as StyledProvider} from 'styled-components';
import theme from './default/theme';
const initState = {
  index: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'set': {
      return {...state, ...action.payload};
    }

    default:
      throw new Error();
  }
}

function useTheme(themes, callback) {
  const [state, dispatch] = React.useReducer(reducer, initState);

  const setTheme = index => {
    dispatch({type: 'set', payload: {index}});
  };

  const getTheme = React.useMemo(() => {
    return callback(themes[state.index]);
  }, [callback, state, themes]);

  const context = {
    state,
    setTheme,
    getTheme,
    dispatch
  };

  return [state, context];
}

export const ThemeContext = React.createContext(initState);

export default function Theme({children, themes = [], callback = t => t}) {
  const [state, value] = useTheme(themes.length ? themes : [theme], callback);

  return (
    <ThemeContext.Provider state={state} value={value}>
      <StyledProvider theme={value.getTheme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}
