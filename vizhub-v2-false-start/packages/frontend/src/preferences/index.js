import React, { createContext, useState, useEffect, useMemo } from 'react';
import { colorThemeOptions, fontOptions, ligaturesOptions } from './options';
import { preferencesMemoryGateway } from './gateway';
import { usePreference } from './usePreference';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const gateway = useMemo(preferencesMemoryGateway, []);

  const [colorTheme, setColorTheme] = usePreference('colorTheme', gateway);
  const [font, setFont] = useState('Ubuntu Mono');
  const [ligatures, setLigatures] = useState('arrows');

  const preferences = {
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
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
};
