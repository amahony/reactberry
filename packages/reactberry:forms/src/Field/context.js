import React, {createContext, useContext} from 'react';

export const FieldContext = createContext(null);

export function useFieldContext() {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error('useFieldContext must be used within `@reactberry/forms` Field.');
  }

  return context;
}