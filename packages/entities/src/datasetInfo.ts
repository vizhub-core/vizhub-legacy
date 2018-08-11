import { DocumentInfo } from './documentInfo';
import { DATASET_TYPE } from './documentTypes';

type Format = 'csv' | 'tsv' | 'json' | 'geojson' | 'topojson' | 'txt';

export class DatasetInfo extends DocumentInfo {

  // The format of this dataset.
  format: Format;

  constructor(data) {

    super({
      documentType: DATASET_TYPE,
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,
      createdTimestamp: data.createdTimestamp,
      lastUpdatedTimestamp: data.lastUpdatedTimestamp
    });

    this.format = data.format;
  }
}
