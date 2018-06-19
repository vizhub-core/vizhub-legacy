import { DocumentInfo } from './documentInfo';

export class DatasetInfo extends DocumentInfo {
  constructor(data) {
    super({
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,
    });

    // The format of this dataset.
    // One of: 'csv', 'tsv', 'json', 'geojson', 'topojson', or 'txt'.
    this.format = data.format;
  }
}
