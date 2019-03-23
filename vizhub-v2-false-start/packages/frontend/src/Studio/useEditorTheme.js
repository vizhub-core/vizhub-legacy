import { useMemo, useContext } from 'react';
import { PreferencesContext } from '../userPreferences';
import * as themes from '../themes';

export const useEditorTheme = () => {
  const { colorTheme, font, ligatures } = useContext(PreferencesContext);
  return useMemo(
    () =>
      Object.assign({}, themes[colorTheme], {
        font: {
          family: font + (ligatures !== 'all' ? ' Arrowized' : ''),
          size: '16pt',
          ligatures: ligatures !== 'none'
        }
      }),
    [colorTheme, font, ligatures]
  );
};
