import {
  UserId,
  DocumentId,
  File
} from 'datavis-tech-entities';

import {
  CreateDatasetRequestModel,
  CreateDatasetResponseModel,
  GetDatasetRequestModel,
  //GetDatasetResponseModel,
  //SaveDatasetRequestModel,
  //SaveDatasetResponseModel
} from '../interactors';

export interface DatasetGateway {
  createDataset(options: {
    owner: UserId,
    id: DocumentId,
    title: string,
    slug: string | undefined,
    description: string,
    file: File
  }): Promise<CreateDatasetResponseModel>;

  getDataset(request: GetDatasetRequestModel):
    Promise<GetDatasetResponseModel>;

  //saveDataset(request: SaveDatasetRequestModel):
  //  Promise<SaveDatasetResponseModel>;
}
