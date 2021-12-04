import diffMatchPatch from 'diff-match-patch';
import jsonDiff from 'json0-ot-diff';

export const computeDiffOps = (vizDataA, vizDataB) =>
  jsonDiff(vizDataA, vizDataB, diffMatchPatch);
