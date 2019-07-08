import { UserId, DocumentId, File, DatasetInfo } from 'vizhub-entities';

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

  getDatasetInfosByUserId(id: UserId): Promise<[DatasetInfo]>;

  //saveDataset(request: SaveDatasetRequestModel):
  //  Promise<SaveDatasetResponseModel>;
}
