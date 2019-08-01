// These modules required for real-time features
// are split out into a separate chunk and loaded dynamically.
import json0 from '@datavis-tech/ot-json0';
import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import produce from 'immer';
import { connection } from './connection';

// Make json0 apply immutable.
// Related: https://github.com/ottypes/json0/issues/26
const originalApply = json0.type.apply;
json0.type.apply = (snapshot, op) =>
  produce(snapshot, draftSnapshot => {
    originalApply(draftSnapshot, op);
  });

export { json0, jsondiff, diffMatchPatch, produce, connection };
