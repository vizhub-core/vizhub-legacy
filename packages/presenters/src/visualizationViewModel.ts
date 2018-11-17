import { Visualization, Files, DocumentId } from 'datavis-tech-entities';

export class VisualizationViewModel {
  id: DocumentId;
  files: Files;
  title: string;
  description: string;
  width: number;
  height: number;

  constructor(visualization: Visualization) {
    this.id = visualization.id;
    this.files = visualization.content.files;
    this.title = visualization.info.title;
    this.description = visualization.info.description;
    this.width = 960; // visualization.info.width;
    this.height = visualization.info.height || 500;
  }
}
