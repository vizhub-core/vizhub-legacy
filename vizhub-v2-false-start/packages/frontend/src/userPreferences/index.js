import React, { createContext, useState } from 'react';
import { colorThemeOptions, fontOptions, ligaturesOptions } from './options';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState('ubuntu');
  const [font, setFont] = useState('Ubuntu Mono');
  const [ligatures, setLigatures] = useState('arrows');

  const userPreferences = {
    colorTheme,
    colorThemeOptions,
    setColorTheme,

    font,
    fontOptions,
    setFont,

    ligatures,
    ligaturesOptions,
    setLigatures
  };
  return (
    <PreferencesContext.Provider value={userPreferences}>
      {children}
    </PreferencesContext.Provider>
  );
};
