import * as assert from 'assert';
import { describe, it } from 'mocha';
import { Gateways } from '../src/Gateways';
import { MemoryGateways } from '../src/MemoryGateways';
import { primordialViz } from './fixtures';

// If true, DatabaseGateways is used in tests (run before deploying).
// If false, MemoryGateways is used in tests (faster, run during dev).
// With `npm test`, this is false.
// With `npm run testDB`, this is true.
const testDB = process.env.VIZHUB_TEST_DATABASE === 'true';

describe('Gateways', () => {
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

  it('tear down', async () => {
    if (testDB) {
      //await databaseConnection.mongoDBDatabase.dropDatabase();
      //await databaseConnection.mongoDBConnection.close();
    }
  });
});
