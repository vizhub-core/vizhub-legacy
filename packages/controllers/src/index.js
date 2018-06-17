import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
export const changeDocument = (oldDocument, newDocument) => (
  jsondiff(oldDocument, newDocument, diffMatchPatch);
);
