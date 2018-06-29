import assert = require('assert');

import {
  CreateVisualization,
  CVRequest,
  CVResponse,
  VisualizationGateway
} from '../src/index';

class MockVisualizationGateway implements VisualizationGateway {
  async createVisualization(request: CVRequest): Promise<CVResponse> {
    const response: CVResponse = { };
    return response;
  }
}

const visualizationGateway = new MockVisualizationGateway();

describe('Use Cases', () => {
  describe('Create Visualization', () => {
    const createVisualization = new CreateVisualization(visualizationGateway);

    it('should execute', async () => {
      const request: CVRequest = {};
      const response: CVResponse = await createVisualization.execute(request);
      assert(response !== null);
    });
  });
});
