import { UseCase, RequestModel, ResponseModel } from '../useCase';

class CreateVisualizationRequestModel implements RequestModel {
}

class CreateVisualizationResponseModel implements ResponseModel {
}

export class CreateVisualization implements UseCase{
  execute(request: CreateVisualizationRequestModel):CreateVisualizationResponseModel {

  }
}
