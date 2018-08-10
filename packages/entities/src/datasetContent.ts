import { DocumentContent } from './documentContent';
import { DATASET_TYPE } from './documentTypes';

export class DatasetContent extends DocumentContent {

  // The text content of this dataset.
  text: string;

  constructor(data) {
    super({
      id: data.id,
      documentType: DATASET_TYPE
    });
    this.text = data.text;
  }
}
