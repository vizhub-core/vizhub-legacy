import { UserId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { UseCase, Request, Response } from './useCase';
import { VisualizationGateway } from './gatewayInterfaces/visualizationGateway'

// CV = CreateVisualization
export interface CVRequest extends Request {
  owner: UserId
}

export interface CVResponse extends Response {
}

export class CreateVisualization implements UseCase{
  visualizationGateway: VisualizationGateway;

  constructor(visualizationGateway: VisualizationGateway) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(request: CVRequest): Promise<CVResponse> {

    if (!request.owner) {
      throw new Error(i18n('errorNoOwner'))
    }

    return await Promise.resolve('foo');
  }
}
