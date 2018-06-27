import { VisualizationInfo } from './visualizationInfo';
import { VisualizationContent } from './visualizationContent';
import { DocumentId } from './documentId';

export class Visualization {

  // The unique ID of this visualization.
  id: DocumentId;

  // The info part of this visualization.
  info: VisualizationInfo;

  // The content part of this visualization.
  content: VisualizationContent;

  constructor(data) {
    this.id = data.visualizationInfo.id;
    this.info = data.visualizationInfo;
    this.content = data.visualizationContent;
  }
}
