import * as assert from 'assert';
import { describe, it } from 'mocha';
import { ForkViz } from '../src/ForkViz';
import { DeleteViz } from '../src/DeleteViz';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../src/errors';
import { primordialViz, ts2, ts3, ts4 } from './fixtures';
import { initGateways } from './initGateways';

export const DeleteVizTest = () => {
  describe('DeleteViz', async () => {
    it('deleteViz', async () => {
      const gateways = initGateways();
      const { saveVizInfo, saveVizContent, getVizInfo } = gateways;
      const forkViz = ForkViz(gateways);
      const deleteViz = DeleteViz(gateways);
      const { id, vizInfo, vizContent } = primordialViz;
      await saveVizInfo(vizInfo);
      await saveVizContent(vizContent);

      await forkViz({
        newVizId: 'viz2',
        newOwner: 'user2',
        forkedFrom: id,
        timestamp: ts2,
      });

      await forkViz({
        newVizId: 'viz5',
        newOwner: 'user2',
        forkedFrom: 'viz2',
        timestamp: ts3,
      });

      await forkViz({
        newVizId: 'viz6',
        newOwner: 'user2',
        forkedFrom: 'viz2',
        timestamp: ts4,
      });

      assert.equal((await getVizInfo('viz2')).data.forkedFrom, 'viz1');
      assert.equal((await getVizInfo('viz5')).data.forkedFrom, 'viz2');
      assert.equal((await getVizInfo('viz6')).data.forkedFrom, 'viz2');

      await deleteViz('viz2');

      assert.equal((await getVizInfo('viz5')).data.forkedFrom, 'viz1');
      assert.equal((await getVizInfo('viz6')).data.forkedFrom, 'viz1');

      await gateways.getVizInfo('viz2').then(
        () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_INFO_NOT_FOUND);
        }
      );

      await gateways.getVizContent('viz2').then(
        () =>
          Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
        }
      );
    });
  });
};
