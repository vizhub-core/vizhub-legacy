// @flow
import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';

// A unique itentifier for a commit.
type CommitId = string;

// TODO move these Viz related types into entities package and flesh out.
// A unique identifier for a Viz.
type VizId = string;
type Viz = { id: VizId };

// TODO flesh this out based on JSON1.
type Ops = any;

// The ID of the first commit, root of the entire DAG.
export const ROOT_COMMIT_ID: CommitId = 'root';

export type Commit = {
  id: CommitId,
  parentId: CommitId | null,
  vizId: VizId,
  ops: Ops,
};

export const computeDiffOps = (snapshotA: any, snapshotB: any) =>
  jsondiff(snapshotA, snapshotB, diffMatchPatch);

export const createRootCommit = (viz: Viz): Commit => ({
  id: ROOT_COMMIT_ID,
  parentId: null,
  vizId: viz.id,
  ops: computeDiffOps({}, viz),
});
