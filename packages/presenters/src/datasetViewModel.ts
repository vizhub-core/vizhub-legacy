import { Dataset } from 'datavis-tech-entities';

export class DatasetViewModel {
  title: string;
  slug: string;
  format: string;
  text: string;

  constructor(dataset: Dataset) {
    this.title = dataset.info.title;
    this.slug = dataset.info.slug;
    this.format = dataset.info.format;
    this.text = dataset.content.text;
  }
}
