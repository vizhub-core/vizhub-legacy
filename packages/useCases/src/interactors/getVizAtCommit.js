import { type as json0 } from 'ot-json0';

export class GetVizAtCommit {
  constructor({ revisionHistoryGateway }) {
    this.revisionHistoryGateway = revisionHistoryGateway;
  }

  async execute(requestModel) {
    const { commit } = requestModel;

    // Goal: Derive the viz data for the specified commit.
    //
    // Phase I Algorithm:
    //  - Trace back all the way to the root commit, apply all ops.
    //
    let previousCommit = commit;
    const edges = [];
    while (true) {
      const incomingEdges = await this.revisionHistoryGateway.getEdgesByTarget(
        previousCommit
      );

      // Break if we've reached the root commit.
      // We know we've hit the root when it has no incoming edges.
      if (incomingEdges.length === 0) {
        break;
      }

      // If there are multiple incoming edges,
      // for example a commit that's the result of merging a pull request,
      // pick one of them arbitrarily to follow (order does not matter).
      const edge = incomingEdges[0];

      edges.push(edge);
      previousCommit = edge.source;
    }

    // Derive the viz at this commit by applying all ops leading to it.
    const viz = edges
      .reverse()
      .reduce((accumulator, edge) => json0.apply(accumulator, edge.ops), {});

    return viz;

    //
    // Phase II Algorithm:
    //  - Trace back until we find a cached snapshot, or the root commit.
    //  - Before returning, store the snapshot in snapshot cache.
    //
  }
}
