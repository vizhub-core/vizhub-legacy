import * as assert from 'assert';
import { describe, it } from 'mocha';
import { Gateways } from '../src/Gateways';
import { MemoryGateways } from '../src/MemoryGateways';
import { forkViz } from '../src/forkViz';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../src/errors';
import { primordialViz, ts2 } from './fixtures';

// If true, DatabaseGateways is used in tests (run before deploying).
// If false, MemoryGateways is used in tests (faster, run during dev).
// With `npm test`, this is false.
// With `npm run testDB`, this is true.
const testDB = process.env.VIZHUB_TEST_DATABASE === 'true';

describe('Gateways & Interactors', () => {
  let gateways: Gateways;
  //let databaseConnection: DatabaseConnection;

  it('setup', async () => {
    if (testDB) {
      //databaseConnection = await createDatabaseConnection(
      //  'mongodb://localhost:27017/vizhub-test'
      //);
      //gateways = DatabaseGateways(databaseConnection);
    } else {
      gateways = MemoryGateways();
    }
  });

  it('saveVizInfo & getVizInfo', async () => {
    const { saveVizInfo, getVizInfo } = gateways;
    const { vizInfo } = primordialViz;
    await saveVizInfo(vizInfo);
    assert.deepEqual(await getVizInfo(vizInfo.id), vizInfo);
  });

  it('saveVizContent & getVizContent', async () => {
    const { saveVizContent, getVizContent } = gateways;
    const { vizContent } = primordialViz;
    await saveVizContent(vizContent);
    assert.deepEqual(await getVizContent(vizContent.id), vizContent);
  });

  it('getVizContent error case VIZ_CONTENT_NOT_FOUND', () =>
    gateways.getVizContent('unknown-id').then(
      () => Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
      }
    ));

  it('forkViz', async () => {
    const newVizId = 'viz2';
    const newOwner = 'user2';
    const forkedFrom = primordialViz.id;
    const timestamp = ts2;

    await forkViz({
      gateways,
      newVizId,
      newOwner,
      forkedFrom,
      timestamp,
    });

    assert.deepEqual(await gateways.getVizInfo(newVizId), {
      ...primordialViz.vizInfo,
      id: newVizId,
      owner: newOwner,
      forkedFrom,
      createdTimestamp: timestamp,
      lastUpdatedTimestamp: timestamp,
    });

    assert.deepEqual(await gateways.getVizContent(newVizId), {
      ...primordialViz.vizContent,
      id: newVizId,
    });
  });

  it('forkViz error case VIZ_INFO_NOT_FOUND', () => {
    return forkViz({
      gateways,
      newVizId: 'viz2',
      newOwner: 'user2',
      forkedFrom: 'unknown-id',
      timestamp: ts2,
    }).then(
      () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_INFO_NOT_FOUND);
      }
    );
  });

  it('tear down', async () => {
    if (testDB) {
      //await databaseConnection.mongoDBDatabase.dropDatabase();
      //await databaseConnection.mongoDBConnection.close();
    }
  });
});
