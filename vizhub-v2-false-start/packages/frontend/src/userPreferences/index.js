import React, { createContext, useState, useEffect, useMemo } from 'react';
import { colorThemeOptions, fontOptions, ligaturesOptions } from './options';
import { preferencesMemoryGateway } from './gateway';

export const PreferencesContext = createContext();

const usePreference = (key, gateway) => {
  const [value, setValue] = useState(gateway.get(key));
  useEffect(() => {
    const listener = changed => {
      if (changed === key) {
        setValue(gateway.get(key));
      }
    };
    gateway.on('change', listener);
    return () => {
      gateway.off('change', listener);
    };
  }, []);
  return [value, gateway.set(key)];
};

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
