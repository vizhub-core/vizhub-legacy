import { DocumentContent } from './documentContent';

export class DatasetContent extends DocumentContent {
  constructor(data) {
    super(data.id);

    // The text content of this dataset.
    this.text = data.text;
  }
}
