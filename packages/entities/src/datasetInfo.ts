import { DocumentInfo } from './documentInfo';

type Format = 'csv' | 'tsv' | 'json' | 'geojson' | 'topojson' | 'txt';

export class DatasetInfo extends DocumentInfo {

  // The format of this dataset.
  format: Format;

  constructor(data) {

    super({
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,
    });

    this.format = data.format;
  }
}
