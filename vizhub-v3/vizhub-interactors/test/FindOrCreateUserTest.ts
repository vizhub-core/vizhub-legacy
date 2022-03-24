import * as assert from 'assert';
import { describe, it } from 'mocha';
import { FindOrCreateUser, setGenerateId } from '../src/FindOrCreateUser';
import { USER_NOT_FOUND } from '../constants';
import { ciUser } from './fixtures';
import { initGateways } from './initGateways';

// For testing only - generate consistent IDs, not random.
let i = 100;
setGenerateId(() => '' + i++);

export const FindOrCreateUserTest = () => {
  describe('FindOrCreateUser', async () => {
    it('findOrCreateUser', async () => {
      const gateways = initGateways();
      const { getUserSnapshotById, getUserSnapshotByEmails } = gateways;

      const findOrCreateUser = FindOrCreateUser(gateways);

      const user = await findOrCreateUser({
        googleProfile: {
          displayName: 'Joe Shmoe',
          emails: [{ value: 'joe@shmoe.com' }],
        },
      });

      assert.deepEqual(
        (await getUserSnapshotByEmails([ciUser.primaryEmail])).data,
        {
          id: 100,
          emails: ['joe@shmoe.com'],
          primaryEmail: 'joe@shmoe.com',
          userName: 101,
          profiles: {
            googleProfile: {
              displayName: 'Joe Shmoe',
              emails: [{ value: 'joe@shmoe.com' }],
            },
          },
        }
      );
    });
  });
};
