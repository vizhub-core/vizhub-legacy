export class Dataset {
  constructor(data) {
    // The unique ID of this dataset.
    this.id = data.datasetInfo.id;
    // The info part of this dataset.
    this.info = data.datasetInfo;
    // The content part of this dataset.
    this.content = data.datasetContent;
  }
}
