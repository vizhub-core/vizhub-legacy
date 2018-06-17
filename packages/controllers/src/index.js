import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';

export const Controllers = gateway => ({
  changeDocument: (oldDocument, newDocument) => {
    const ops = jsonDiff(oldDocument, newDocument, diffMatchPatch);
    gateway.changeDocument(ops);
  }
});
