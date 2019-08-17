// These modules required for real-time features
// are split out into a separate chunk and loaded dynamically.
import ShareDB, { Connection } from '@teamwork/sharedb/lib/client';
import { type as json0 } from '@datavis-tech/ot-json0';
import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import produce from 'immer';

// Spoof json0 name and URI to match existing documents from VizHub 1.0.
Object.assign(json0, {
  name: 'json0',
  uri: 'http://sharejs.org/types/JSONv0'
});

// Register our custom OT type (that implements presence) as the default.
ShareDB.types.register(json0);
ShareDB.types.defaultType = json0;

// Make json0 apply immutable.
// Related: https://github.com/ottypes/json0/issues/26
const originalApply = json0.apply;
json0.apply = (snapshot, op) =>
  produce(snapshot, draftSnapshot => {
    originalApply(draftSnapshot, op);
  });

export { json0, jsondiff, diffMatchPatch, produce, Connection };
