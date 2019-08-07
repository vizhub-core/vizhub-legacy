import { useMemo } from 'react';
import {
  defaultCodingFontFamily,
  defaultCodingFontSize
} from '../../../../theme';
import * as themes from './themes';

export const useEditorTheme = () => {
  // TODO port PreferencesContext from vizhub2 repo
  //const { colorTheme, font, ligatures } = useContext(PreferencesContext);
  const colorTheme = 'oneDark';
  const font = defaultCodingFontFamily;
  const ligatures = 'arrows';

  return useMemo(
    () =>
      Object.assign({}, themes[colorTheme], {
        font: {
          family: font + (ligatures !== 'all' ? ' Arrowized' : ''),
          size: defaultCodingFontSize,
          ligatures: ligatures !== 'none'
        }
      }),
    [colorTheme, font, ligatures]
  );
};
