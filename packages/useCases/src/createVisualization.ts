import { UseCase, Request, Response } from './useCase';
import { VisualizationGateway } from './gatewayInterfaces/visualizationGateway'

// CV = CreateVisualization
export interface CVRequest extends Request {
}

export interface CVResponse extends Response {
}

export class CreateVisualization implements UseCase{
  visualizationGateway: VisualizationGateway;

  constructor(visualizationGateway: VisualizationGateway) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(request: CVRequest): Promise<CVResponse> {
    return await Promise.resolve('foo');
  }
}
