import { DocumentInfo } from './documentInfo';
import { DATASET_TYPE } from './documentTypes';

export class DatasetInfo extends DocumentInfo {
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

    // The format of this dataset.
    // 'csv' | 'tsv' | 'json' | 'geojson' | 'topojson' | 'txt'
    this.format = data.format;

    // The name of the source of this dataset.
    this.sourceName = data.sourceName;

    // The URL of the page from which this dataset was downloaded.
    this.sourceUrl = data.sourceUrl;
  }
}
