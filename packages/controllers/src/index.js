import * as jsonDiff from 'json0-ot-diff';
import * as diffMatchPatch from 'diff-match-patch';

// TODO figure out where this logic should go
export const Controller = gateway => ({
  changeDocument: (oldDocument, newDocument) => {
    const ops = jsonDiff(oldDocument, newDocument, diffMatchPatch);
    gateway.changeDocument(ops);
  }
});

export { visualizationController } from './visualizationController';
