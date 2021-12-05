import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';

export const save = (doc, data) =>
  new Promise((resolve, reject) => {
    const callback = (error) =>
      error ? reject(error) : resolve({ status: 'success' });

    if (!doc.type) {
      doc.create(data, callback);
    } else {
      doc.submitOp(jsonDiff(doc.data, data, diffMatchPatch), callback);
    }
  });
