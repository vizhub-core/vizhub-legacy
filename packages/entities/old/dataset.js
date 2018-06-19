import { Document } from './document';

// This file represents the domain entity called Dataset.
export const Dataset = data => (
  Object.assign(Document(data, 'dataset'), {

    // The text content of this dataset.
    content: data.content,

    // The format of this dataset.
    // One of: 'csv', 'tsv', 'json', 'geojson', 'topojson', or 'txt'.
    format: data.format
  })
);
