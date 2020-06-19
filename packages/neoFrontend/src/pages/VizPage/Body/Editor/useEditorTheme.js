import { useMemo } from 'react';
import {
  defaultCodingFontFamily,
  defaultCodingFontSize,
} from '../../../../theme';
//import * as themes from './themes';
import { vizHub } from './themes';

export const useEditorTheme = (rotation) => {
  return useMemo(
    () =>
      //Object.assign({}, themes[colorTheme], {
      Object.assign({}, vizHub(rotation), {
        font: {
          family: defaultCodingFontFamily,
          size: defaultCodingFontSize,
        },
      }),
    [rotation]
  );
};
