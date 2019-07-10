export class Visualization {
  constructor(data) {
    // The unique ID of this visualization.
    this.id = data.visualizationInfo.id;

    // The info part of this visualization.
    this.info = data.visualizationInfo;

    // The content part of this visualization.
    this.content = data.visualizationContent;
  }
}
