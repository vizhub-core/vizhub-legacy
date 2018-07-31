import { DatasetInfo } from './datasetInfo';
import { DatasetContent } from './datasetContent';
import { DocumentId } from './documentId';

export class Dataset {

  // The unique ID of this dataset.
  id: DocumentId;

  // The info part of this dataset.
  info: DatasetInfo;

  // The content part of this dataset.
  content: DatasetContent;

  constructor(data) {
    this.id = data.datasetInfo.id;
    this.info = data.datasetInfo;
    this.content = data.datasetContent;
  }
}
