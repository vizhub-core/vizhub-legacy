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
    // let previousCommit = commit;
    // const edges = [];
    // while(!previousCommit.isRoot){
    //   const edge = getEdgesByTarget(previousCommit)[0];
    //   edges.push(edge);
    //   previousCommit = edge.source;
    // }
    // const viz = edges.reverse().reduce((accumulator, edge) => json0.apply(accumulator, edge.ops), {})
    // return viz;


    //
    // Phase II Algorithm:
    //  - Trace back until we find a cached snapshot, or the root commit.
    //  - Before returning, store the snapshot in snapshot cache.
    //

  }
}
