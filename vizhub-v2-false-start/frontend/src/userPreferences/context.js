import React, { createContext, useState } from 'react';

export const UserPreferencesContext = createContext();

const colorThemeOptions = [
  { title: 'Ubuntu', id: 'ubuntu' },
  { title: 'One Dark', id: 'oneDark' }
];

const fontOptions = [
  'Ubuntu Mono',
  'Fira Code',
  'Deja Vu Sans Mono',
  'Source Code Pro',
  'Inconsolata-g'
];

const ligaturesOptions = [
  { title: 'None', id: 'none' },
  { title: 'Arrows', id: 'arrows' },
  { title: 'All', id: 'all' }
];

export const UserPreferencesProvider = ({ children }) => {
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
    <UserPreferencesContext.Provider value={userPreferences}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
