import { UserId, DocumentId, File } from 'datavis-tech-entities';

import {
  CreateDatasetRequestModel,
  CreateDatasetResponseModel,
  GetDatasetRequestModel,
  GetDatasetResponseModel,
  //SaveDatasetRequestModel,
  //SaveDatasetResponseModel
} from '../interactors';

export interface DatasetGateway {
  createDataset(request: CreateDatasetRequestModel):
    Promise<CreateDatasetResponseModel>;

  getDataset(options: {
    owner: UserId,
    slug: string
  }): Promise<GetDatasetResponseModel>;

  //saveDataset(request: SaveDatasetRequestModel):
  //  Promise<SaveDatasetResponseModel>;
}
