import * as assert from 'assert';
import { describe, it } from 'mocha';
import { ForkViz, DeleteViz, SaveViz } from '../src';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../constants';
import { primordialViz, ts2, ts3, ts4 } from './fixtures';
import { initGateways } from './initGateways';

export const DeleteVizTest = () => {
  describe('DeleteViz', async () => {
    it('deleteViz', async () => {
      const gateways = initGateways();
      const { saveVizInfo, saveVizContent, getVizInfoSnapshot } = gateways;
      const forkViz = ForkViz(gateways);
      const saveViz = SaveViz(gateways);
      const deleteViz = DeleteViz(gateways);
      const { id } = primordialViz;
      await saveViz(primordialViz);

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

      assert.equal((await getVizInfoSnapshot('viz2')).data.forkedFrom, 'viz1');
      assert.equal((await getVizInfoSnapshot('viz5')).data.forkedFrom, 'viz2');
      assert.equal((await getVizInfoSnapshot('viz6')).data.forkedFrom, 'viz2');

      await deleteViz('viz2');

      assert.equal((await getVizInfoSnapshot('viz5')).data.forkedFrom, 'viz1');
      assert.equal((await getVizInfoSnapshot('viz6')).data.forkedFrom, 'viz1');

      await gateways.getVizInfoSnapshot('viz2').then(
        () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_INFO_NOT_FOUND);
        }
      );

      await gateways.getVizContentSnapshot('viz2').then(
        () =>
          Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
        }
      );

      await deleteViz('viz1');
    });
    it('getVizContentSnapshot error case VIZ_INFO_NOT_FOUND', () => {
      const gateways = initGateways();
      return gateways.getVizInfoSnapshot('unknown-id').then(
        () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_INFO_NOT_FOUND);
        }
      );
    });
    it('deleteViz for non-existent viz', async () => {
      const gateways = initGateways();
      const deleteViz = DeleteViz(gateways);
      return deleteViz('unknown-id').then(
        () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_INFO_NOT_FOUND);
        }
      );
    });
  });
};
