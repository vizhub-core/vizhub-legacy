import { useMemo } from 'react';
import {
  defaultCodingFont,
  defaultCodingFontSize,
  defaultCodingLigatures,
  fontFamily
} from '../../../../theme';
//import * as themes from './themes';
import { vizHub } from './themes';

export const useEditorTheme = rotation => {
  // TODO port PreferencesContext from vizhub2 repo
  //const { colorTheme, font, ligatures } = useContext(PreferencesContext);
  const font = defaultCodingFont;
  const ligatures = defaultCodingLigatures;

  return useMemo(
    () =>
      //Object.assign({}, themes[colorTheme], {
      Object.assign({}, vizHub(rotation), {
        font: {
          family: fontFamily(font, ligatures),
          size: defaultCodingFontSize,
          ligatures: ligatures !== 'none'
        }
      }),
    [rotation, font, ligatures]
  );
};
