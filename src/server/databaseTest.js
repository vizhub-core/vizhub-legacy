import assert from 'assert';
import * as database from './database';
import { generateId } from './generateId';

// TODO Use an in-memory database during tests, for speed.
// An attempt was made, but there were frustrating differences in the
// APIs between the real MongoDB driver and Mingo.
//database.useMingo();

export const databaseTest = () => {
  describe('database', () => {
    it('Should implement expected set of methods.', () => {
      ['createVizInfo', 'getVizInfo', 'getVizInfos', 'getUsersByIds'].forEach(
        (method) => {
          assert(method in database);
        }
      );
    });

    it('should implement getVizInfo - return null if no viz found.', async () => {
      const vizInfo = await database.getVizInfo('12345');
      assert.equal(vizInfo, null);
    });

    it('should implement createViz.', async () => {
      const vizInfoData = {
        title: 'Test Viz',
        id: generateId(),
      };
      const vizId = await database.createVizInfo(vizInfoData);
      const vizInfo = await database.getVizInfo(vizInfoData.id);
      assert.equal(vizInfo.title, vizInfoData.title);
    });

    it('Should close the connection.', () => {
      database.closeConnection();
    });
  });
};
