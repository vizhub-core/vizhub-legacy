import * as assert from 'assert';
import { i18n } from 'datavis-tech-i18n';

import {
  CreateVisualization,
  CreateVisualizationRequestModel,
  CreateVisualizationResponseModel,
  GetVisualization,
  GetVisualizationRequestModel,
  GetVisualizationResponseModel,
  SaveVisualization,
  SaveVisualizationRequestModel,
  SaveVisualizationResponseModel,
  VisualizationGateway,
  CreateDataset,
  CreateDatasetRequestModel,
  CreateDatasetResponseModel,
  GetDataset,
  GetDatasetRequestModel,
  GetDatasetResponseModel,
  ForkVisualization,
  ForkVisualizationRequestModel,
  ForkVisualizationResponseModel,
} from '../src/index';

const visualizationGateway = {};
const datasetGateway = {};

describe('Use Cases', () => {

  describe('Create Visualization', () => {
    const createVisualization = new CreateVisualization({ visualizationGateway });
    it('should error if no owner specified.', done => {
      const requestModel: CreateVisualizationRequestModel = { owner: null };
      createVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });
    // TODO test success case
  });

  describe('Get Visualization', () => {
    const getVisualization = new GetVisualization({ visualizationGateway });
    it('should error if no id specified.', done => {
      const requestModel: GetVisualizationRequestModel = { id: null };
      getVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoId'))
        done();
      });
    });
    // TODO test success case
  });

  describe('Save Visualization', () => {
    let invocations = 0;
    const visualizationGateway = {
      saveVisualization: async () => {
        invocations++;
        return { status: 'success' };
      }
    };
    const saveVisualization = new SaveVisualization({ visualizationGateway });

    it('should invoke saveVisualization in gateway.', async () => {
      const requestModel = {
        visualization: {
          info: {
            owner: '123'
          }
        },
        userId: '123'
      };
      const responseModel = await saveVisualization.execute(requestModel);
      assert.equal(invocations, 1);
      assert.equal(responseModel.status, 'success');
    });

    it('should error if user does not match owner.', done => {
      invocations = 0;
      const requestModel = {
        visualization: {
          info: {
            owner: '123'
          }
        },
        userId: '234'
      };
      saveVisualization.execute(requestModel)
        .catch(error => {
          assert.equal(invocations, 0);
          assert.equal(error.message, i18n('errorNotOwnerCantSave'))
          done();
        });
    });
  });
  describe('Create Dataset', () => {
    const createDataset = new CreateDataset({ datasetGateway });
    it('should error if no owner specified.', done => {
      const requestModel: CreateDatasetRequestModel = {
        owner: null,
        title: 'Foo',
        slug: 'foo',
        description: 'Foo is cool',
        file: {
          name: 'foo',
          text: 'foo'
        }
      };
      createDataset.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });
    // TODO test success case
  });

  describe('Get Dataset', () => {
    const getDataset = new GetDataset({ datasetGateway });
    it('should error if no slug specified.', done => {
      const requestModel: GetDatasetRequestModel = {
        userName: 'thomas',
        slug: ''
      };
      getDataset.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoId'))
        done();
      });
    });
    // TODO test success case
  });
  
  describe('Fork Visualization', () => {
    let invocations = 0;
    let arg;
    const visualizationGateway = {
      createVisualization: async (argument) => {
        arg = argument;
        invocations++;
        return { id: '1234' };
      }
    };
    const forkVisualization = new ForkVisualization({ visualizationGateway });
    it('should error if no owner specified.', done => {
      const requestModel: ForkVisualizationRequestModel = {
        visualization: {
          info: {
            id: '456',
            owner: '123'
          },
          content: {
            files: [{ name: 'index.html', text: 'HTML yes' }]
          }
        },
        userId: null
      };
      forkVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        assert.equal(invocations, 0);
        done();
      });
    });

    it('should invoke gateway if owner specified.', async () => {
      const requestModel: ForkVisualizationRequestModel = {
        visualization: {
          id: '456',
          info: {
            owner: '123',
            title: 'foo',
            description: 'Foo is cool'
          },
          content: {
            files: [{ name: 'index.html', text: 'HTML yes' }]
          }
        },
        userId: '456'
      };
      await forkVisualization.execute(requestModel);
      assert.equal(invocations, 1);
      const expected = {
        "id": arg.id,
        "owner": "456",
        "title": "foo",
        "description": "Foo is cool",
        "files": [ { "name": "index.html", "text": "HTML yes" } ],
        "forkedFrom": "456",
        "slug": undefined
      };
      assert.deepEqual(arg, expected);
    });
    // TODO test success case
  });
});
