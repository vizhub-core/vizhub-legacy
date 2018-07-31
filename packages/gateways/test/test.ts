import * as assert from 'assert';
import {
  DatabaseVisualizationGateway,
  DatabaseDatasetGateway
} from '../src';

describe('Visualization Gateway', () => {

  describe('createVisualization', () => {
    it('should invoke db if success.', done => {
      const database = {
        createVisualization: async () => ({ id: '123' })
      };
      const visualizationGateway = new DatabaseVisualizationGateway(database);
      visualizationGateway.createVisualization({ owner: 'bob' })
        .then(({id}) => {
          assert.equal(id, '123');
          done();
        });
    });
  });

  describe('createDataset', () => {
    it('should invoke db if success.', done => {
      const database = {
        createDataset: async () => ({ id: '123' })
      };
      const datasetGateway = new DatabaseDatasetGateway(database);
      datasetGateway.createDataset({ owner: 'bob' })
        .then(({id}) => {
          assert.equal(id, '123');
          done();
        });
    });
  });
});
