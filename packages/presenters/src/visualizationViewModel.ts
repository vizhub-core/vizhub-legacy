import { Visualization, Files } from 'datavis-tech-entities';

export class VisualizationViewModel {
  files: Files;
  title: string;
  width: number;
  height: number;

  constructor(visualization: Visualization) {
    this.files = visualization.content.files;
    this.title = visualization.info.title;
    this.width = 960; // visualization.info.width;
    this.height = 500; // visualization.info.height
  }
}
