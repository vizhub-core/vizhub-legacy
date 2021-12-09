import { DocumentContent } from './documentContent';
import { DATASET_TYPE } from './documentTypes';

export class DatasetContent extends DocumentContent {
  constructor(data) {
    super({
      id: data.id,
      documentType: DATASET_TYPE,
    });

    // The text content of this dataset.
    this.text = data.text;
  }
}
