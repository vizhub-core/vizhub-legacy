import * as assert from 'assert';
import { i18n } from 'datavis-tech-i18n';

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

    it('should error if no owner specified.', done => {
      const request: CVRequest = {
        owner: null
      };
      createVisualization.execute(request).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });

    //it('should execute', async () => {
    //  const request: CVRequest = {};
    //  const response: CVResponse = await createVisualization.execute(request);
    //  assert(response !== null);
    //});
  });
});
