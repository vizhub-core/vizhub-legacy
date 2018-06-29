import { CVRequest, CVResponse } from '../createVisualization';

export interface VisualizationGateway {
  createVisualization(request: CVRequest): Promise<CVResponse>
}
