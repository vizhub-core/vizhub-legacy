export class Visualization {
  constructor(data) {
    this.id = data.visualizationInfo.id;
    this.info = data.visualizationInfo;
    this.content = data.visualizationContent;
  }
}
