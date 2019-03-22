import { useMemo, useContext } from 'react';
import { UserPreferencesContext } from '../userPreferences';
import * as themes from '../themes';

export const useEditorTheme = () => {
  const { colorTheme, font, ligatures } = useContext(UserPreferencesContext);
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
