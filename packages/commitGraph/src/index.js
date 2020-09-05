// @flow

// A unique itentifier for a commit.
type CommitId = string;

// A unique identifier for a Viz.
type VizId = string;

// TODO flesh this out.
type Ops = any;

export type Commit = {
  id: CommitId,
  parentId: CommitId,
  ops: Ops,
  viz: VizId
}

export function square(n: number): number {
  return n * n;
}
