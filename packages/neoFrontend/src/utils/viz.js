import { isNumberSequenceString } from './number';
import { domain } from '../constants';

export const VizLinkBuilder = (vizPath) => {
  const searchParams = new URLSearchParams();
  let lines = '';

  const builder = {
    setMode(mode) {
      if (mode) searchParams.set('mode', mode);

      return builder;
    },

    setFile(file) {
      if (file) searchParams.set('file', file);

      return builder;
    },

    setLines(possibleLines) {
      if (isNumberSequenceString(possibleLines)) {
        lines = `L${possibleLines}`;
      } else {
        lines = '';
      }

      return builder;
    },

    get() {
      return `${domain}${vizPath}?${searchParams.toString()}#${lines}`;
    },
  };

  return builder;
};
