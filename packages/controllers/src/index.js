import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';

export const controllers = gateway => ({
  changeDocument: (oldDocument, newDocument) => {
    const ops = jsondiff(oldDocument, newDocument, diffMatchPatch);
    gateway.changeDocument(ops);
  )
}
