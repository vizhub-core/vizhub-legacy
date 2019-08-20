export class VisualizationViewModel {
  constructor(visualization) {
    this.id = visualization.id;
    this.files = visualization.content.files;
    this.title = visualization.info.title;
    this.description = visualization.info.description;
    this.width = 960; // visualization.info.width;
    this.height = visualization.info.height || 500;
  }
}
