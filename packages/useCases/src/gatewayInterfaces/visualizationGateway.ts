import {
  UserId,
  DocumentId,
  File,
  VisualizationInfo,
  Visualization
} from 'datavis-tech-entities';

import {
  CreateVisualizationRequestModel,
  CreateVisualizationResponseModel,
  SaveVisualizationRequestModel,
  SaveVisualizationResponseModel
} from '../interactors';

export interface VisualizationGateway {

  // TODO pass in a visualization here. Move logic from gateway to use case.
  createVisualization(options: {
    owner: UserId,
    id: DocumentId,
    title: string,
    slug: string | undefined,
    description: string,
    files: File[],
    forkedFrom: DocumentId | undefined,
    createdTimestamp: number,
    lastUpdatedTimestamp: number,
  }): Promise<CreateVisualizationResponseModel>;

  getVisualization({ id }): Promise<Visualization>;

  saveVisualization(request: SaveVisualizationRequestModel):
    Promise<SaveVisualizationResponseModel>;

  getVisualizationInfosByUserId(id: UserId): Promise<[VisualizationInfo]>;

  getAllVisualizationInfos(): Promise<[VisualizationInfo]>;
}
