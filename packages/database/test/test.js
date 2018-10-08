import assert from 'assert';
import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { DATASET_TYPE, testData } from 'datavis-tech-entities';
import { Database } from '../src';

const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
const connection = shareDB.connect();
const database = Database(connection);

const {
  user,
  visualization,
  visualizationInfo,
  dataset
} = testData;

let createdVisualizationId;

describe('Database', () => {

  it('should create a visualization', async () => {
    const { id } = await database.createVisualization(visualization);
    assert.equal(id, visualization.id);
    createdVisualizationId = id;
  });

  it('should create a dataset', async () => {
    const { slug } = await database.createDataset(dataset);
    assert.equal(slug, dataset.info.slug);
  });

  it('should get a dataset', async () => {
    const fetched = await database.getDataset({
      slug: dataset.info.slug
    });
    assert.deepEqual(fetched, { dataset });
  });

  it('should create a user', async () => {
    const userOut = await database.createUser(user)
    assert.deepEqual(userOut, user);
  });

  it('should list visualizations by user', async () => {
    const visualizationInfos = await database.getVisualizationInfosByUserId(user.id);
    assert.deepEqual(visualizationInfos, [visualizationInfo]);
  });

  it('should list all visualization infos', async () => {
    const visualizationInfos = await database.getAllVisualizationInfos();
    assert.deepEqual(visualizationInfos, [visualizationInfo]);
  });

  it('should delete a visualization', async () => {
    const { status } = await database.deleteVisualization({
      id: createdVisualizationId
    });
    assert.equal(status, 'success');
    const visualizationInfos = await database.getAllVisualizationInfos();
    assert.equal(visualizationInfos.length, 0);
  });
});
