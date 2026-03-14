import React, {createContext, useContext} from 'react';

export const FormContext = createContext(null);

export function useReactberryFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useReactberryFormContext must be used within `@reactberry/forms` Form.');
  }

  return context;
}