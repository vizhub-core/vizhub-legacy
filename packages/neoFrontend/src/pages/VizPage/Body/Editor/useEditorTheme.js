import { useMemo } from 'react';
import {
  defaultCodingFontFamily,
  defaultCodingFontSize
} from '../../../../theme';
//import * as themes from './themes';
import { vizHub } from './themes';

export const useEditorTheme = () => {
  // TODO port PreferencesContext from vizhub2 repo
  //const { colorTheme, font, ligatures } = useContext(PreferencesContext);
  const font = defaultCodingFontFamily;
  const ligatures = 'arrows';

  return useMemo(
    () =>
      //Object.assign({}, themes[colorTheme], {
      Object.assign({}, vizHub, {
        font: {
          family: font + (ligatures !== 'all' ? ' Arrowized' : ''),
          size: defaultCodingFontSize,
          ligatures: ligatures !== 'none'
        }
      }),
    [font, ligatures]
  );
};
