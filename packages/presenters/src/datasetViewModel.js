import { Dataset } from 'vizhub-entities';

export class DatasetViewModel {
  constructor(dataset) {
    this.title = dataset.info.title;
    this.slug = dataset.info.slug;
    this.format = dataset.info.format;
    this.sourceName = dataset.info.sourceName;
    this.sourceUrl = dataset.info.sourceUrl;
    this.text = dataset.content.text;
  }
}
