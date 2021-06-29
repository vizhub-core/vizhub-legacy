import assert from 'assert';
import * as database from './database';

// TODO Use an in-memory database during tests, for speed.
// An attempt was made, but there were frustrating differences in the
// APIs between the real MongoDB driver and Mingo.
//database.useMingo();

export const databaseTest = () => {
  describe('database', () => {
    it('Should implement expected set of methods.', () => {
      ['getVizInfo', 'getVizInfos', 'getUsersByIds'].forEach((method) => {
        assert(method in database);
      });
    });

    it('should implement getVizInfo - return null if no viz found.', async () => {
      const vizInfo = await database.getVizInfo({ vizId: '12345' });
      assert.equal(vizInfo, null);
    });

    it('Should close the connection.', () => {
      database.closeConnection();
    });
  });
};
