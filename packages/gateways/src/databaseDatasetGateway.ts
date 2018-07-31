import {
  DatasetGateway,
  CreateDatasetRequest,
  CreateDatasetResponse
} from 'datavis-tech-use-cases';

import {
  Dataset,
  DatasetInfo,
  DatasetContent
} from 'datavis-tech-entities';

export class DatabaseDatasetGateway implements DatasetGateway {
  database: any; // TODO Typescript - Database

  constructor(database) {
    this.database = database;
  }

  async createDataset(options): Promise<CreateDatasetResponse> {
    const {
      owner,
      id,
      title,
      slug,
      description,
      text,
      format
    } = options;

    const dataset = new Dataset({
      datasetInfo: new DatasetInfo({
        id,
        owner,
        title,
        slug,
        description,
        format
      }),
      datasetContent: new DatasetContent({
        id,
        text
      })
    });

    return await this.database.createDataset(dataset);
  }

  //async getDataset({ id }) {
  //  return await this.database.getDataset({ id });
  //}

  //async saveDataset({ dataset }) {
  //  return await this.database.saveDataset({ dataset });
  //}
}
