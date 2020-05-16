// These modules required for real-time features
// are split out into a separate chunk and loaded dynamically.
import ShareDB, { Connection } from 'sharedb/lib/client';
import { type as json0 } from 'json0-with-presence'; 
import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import produce from 'immer';

// Register our custom OT type (that implements presence) as the default.
ShareDB.types.register(json0);
ShareDB.types.defaultType = json0;

// Make json0 apply immutable.
// Related: https://github.com/ottypes/json0/issues/26
const originalApply = json0.apply;
json0.apply = (snapshot, op) =>
  produce(snapshot, (draftSnapshot) => {
    originalApply(draftSnapshot, op);
  });

export { json0, jsondiff, diffMatchPatch, produce, Connection };
