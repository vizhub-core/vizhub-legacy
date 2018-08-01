import {
  UserId,
  DocumentId,
  File
} from 'datavis-tech-entities';

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

  getDataset(request: GetDatasetRequestModel):
    Promise<GetDatasetResponseModel>;

  //saveDataset(request: SaveDatasetRequestModel):
  //  Promise<SaveDatasetResponseModel>;
}
