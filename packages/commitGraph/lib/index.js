import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch'; // A unique itentifier for a commit.

// The ID of the first commit, root of the entire DAG.
export const ROOT_COMMIT_ID = 'root';
export const computeDiffOps = (snapshotA, snapshotB) => jsondiff(snapshotA, snapshotB, diffMatchPatch);
export const createRootCommit = viz => ({
  id: ROOT_COMMIT_ID,
  parentId: null,
  vizId: viz.id,
  ops: computeDiffOps({}, viz)
});