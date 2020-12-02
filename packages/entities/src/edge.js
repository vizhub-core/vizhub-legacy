// An Edge represents a connection between two commits.
export class Edge {
  constructor(data) {
    // The ID of the Commit this Edge comes from.
    this.source = data.source;

    // The ID of the Commit this Edge goes to.
    this.target = data.target;

    // The operational transform operations required
    // to get from the source state to the target state.
    //
    // These ops operate over the Visualization data structure,
    // so can address both viz.info and viz.content.
    this.ops = data.ops;
  }
}
