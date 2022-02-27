import * as assert from 'assert';
import { describe, it } from 'mocha';
import { ForkViz } from '../src/ForkViz';
import { VIZ_INFO_NOT_FOUND } from '../src/errors';
import { primordialViz, ts2 } from './fixtures';
import { initGateways } from './initGateways';

export const ForkVizTest = () => {
  describe('ForkViz', async () => {
    it('forkViz', async () => {
      const gateways = initGateways();
      const { saveVizInfo, getVizInfo, saveVizContent, getVizContent } =
        gateways;
      const forkViz = ForkViz(gateways);

      const { vizContent, vizInfo } = primordialViz;
      await saveVizInfo(vizInfo);
      await saveVizContent(vizContent);

      const newVizId = 'viz2';
      const newOwner = 'user2';
      const forkedFrom = primordialViz.id;
      const timestamp = ts2;

      await forkViz({ newVizId, newOwner, forkedFrom, timestamp });

      assert.deepEqual((await getVizInfo(newVizId)).data, {
        ...vizInfo,
        id: newVizId,
        owner: newOwner,
        forkedFrom,
        createdTimestamp: timestamp,
        lastUpdatedTimestamp: timestamp,
      });

      assert.deepEqual((await getVizContent(newVizId)).data, {
        ...vizContent,
        id: newVizId,
      });
    });

    it('forkViz error case VIZ_INFO_NOT_FOUND', () => {
      const gateways = initGateways();
      const forkViz = ForkViz(gateways);
      return forkViz({
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
  });
};
