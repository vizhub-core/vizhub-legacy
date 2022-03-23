import * as assert from 'assert';
import { describe, it } from 'mocha';
import { FindOrCreateUser } from '../src/FindOrCreateUser';
import { USER_NOT_FOUND } from '../constants';
import { ciUser } from './fixtures';
import { initGateways } from './initGateways';

export const FindOrCreateUserTest = () => {
  describe('FindOrCreateUser', async () => {
    it('findOrCreateUser', async () => {
      const gateways = initGateways();
      const { getUserSnapshotById } = gateways;

      const findOrCreateUser = FindOrCreateUser(gateways);

      await findOrCreateUser({ email: ciUser.email });

      assert.deepEqual(
        (await getUserSnapshotByEmail(ciUser.email)).data,
        ciUser
      );
    });
  });
};
