import {
  DatasetGateway,
  CreateDatasetRequestModel,
  CreateDatasetResponseModel
} from 'datavis-tech-use-cases';

import {
  Dataset,
  DatasetInfo,
  DatasetContent
} from 'datavis-tech-entities';

export class DatabaseDatasetGateway implements DatasetGateway {
  database: any;

  constructor(database) {
    this.database = database;
  }

  async createDataset(options): Promise<CreateDatasetResponseModel> {
    const {
      owner,
      id,
      title,
      slug,
      description,
      text,
      format,
      sourceName,
      sourceUrl
    } = options;

    const dataset = new Dataset({
      datasetInfo: new DatasetInfo({
        id,
        owner,
        title,
        slug,
        description,
        format,
        sourceName,
        sourceUrl
      }),
      datasetContent: new DatasetContent({
        id,
        text
      })
    });

    return await this.database.createDataset(dataset);
  }

  async getDataset({ owner, slug }) {
    return await this.database.getDataset({ owner, slug });
  }

  async getDatasetInfosByUserId(id) {
    return await this.database.getDatasetInfosByUserId(id);
  };

  //async saveDataset({ dataset }) {
  //  return await this.database.saveDataset({ dataset });
  //}
}
