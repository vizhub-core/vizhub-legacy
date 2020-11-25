export class Commit {
  constructor(data) {
    // Every commit belongs to exactly one viz.
    // This field is the ID of the viz that this commit belongs to.
    this.viz = data.viz;
  }
}
