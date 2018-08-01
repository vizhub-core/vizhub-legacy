import { Dataset } from 'datavis-tech-entities';

export class DatasetViewModel {
  title: string;

  constructor(dataset: Dataset) {
    this.title = dataset.info.title;
  }
}
