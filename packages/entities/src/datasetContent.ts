import { DocumentContent } from './documentContent';

export class DatasetContent extends DocumentContent {

  // The text content of this dataset.
  text: string;

  constructor(data) {
    super(data.id);
    this.text = data.text;
  }
}
