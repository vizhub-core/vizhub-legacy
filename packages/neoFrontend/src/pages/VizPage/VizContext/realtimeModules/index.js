// These modules required for real-time features
// are split out into a separate chunk and loaded dynamically.
import json0 from '@datavis-tech/ot-json0';
import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import produce from 'immer';
import { connection } from './connection';

export { json0, jsondiff, diffMatchPatch, produce, connection };
