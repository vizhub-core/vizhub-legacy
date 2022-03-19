import * as assert from 'assert';
import { describe, it } from 'mocha';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../constants';
import { primordialViz } from './fixtures';
import { initGateways } from './initGateways';

export const GatewaysTest = () => {
  describe('Gateways & Interactors', () => {
    it('saveVizInfo & getVizInfoSnapshot', async () => {
      const gateways = initGateways();
      const { saveVizInfo, getVizInfoSnapshot } = gateways;
      const { vizInfo } = primordialViz;
      await saveVizInfo(vizInfo);
      assert.deepEqual((await getVizInfoSnapshot(vizInfo.id)).data, vizInfo);
    });

    it('saveVizContent & getVizContentSnapshot', async () => {
      const gateways = initGateways();
      const { saveVizContent, getVizContentSnapshot } = gateways;
      const { vizContent } = primordialViz;
      await saveVizContent(vizContent);
      assert.deepEqual(
        (await getVizContentSnapshot(vizContent.id)).data,
        vizContent
      );
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

    it('getVizContentSnapshot error case VIZ_CONTENT_NOT_FOUND', () => {
      const gateways = initGateways();
      return gateways.getVizContentSnapshot('unknown-id').then(
        () =>
          Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
        }
      );
    });

    it('deleteVizInfo', async () => {
      const gateways = initGateways();
      const { saveVizInfo, deleteVizInfo } = gateways;
      const { vizInfo } = primordialViz;
      await saveVizInfo(vizInfo);
      await deleteVizInfo(vizInfo.id);

      await gateways.getVizInfoSnapshot(vizInfo.id).then(
        () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_INFO_NOT_FOUND);
        }
      );
    });

    it('deleteVizContent', async () => {
      const gateways = initGateways();
      const { saveVizContent, deleteVizContent } = gateways;
      const { vizContent } = primordialViz;
      await saveVizContent(vizContent);
      await deleteVizContent(vizContent.id);
      await gateways.getVizContentSnapshot(vizContent.id).then(
        () =>
          Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
        }
      );
    });
    it('getForks', async () => {
      const gateways = initGateways();
      const { saveVizInfo, getForks } = gateways;
      const { id, vizInfo } = primordialViz;
      await saveVizInfo(vizInfo);

      await saveVizInfo({ ...vizInfo, id: 'viz2', forkedFrom: id });
      await saveVizInfo({ ...vizInfo, id: 'viz3', forkedFrom: id });

      assert.deepEqual(
        new Set((await getForks(id)).map((fork) => fork.data.id)),
        new Set(['viz2', 'viz3'])
      );

      await saveVizInfo({ ...vizInfo, id: 'viz4', forkedFrom: id });

      assert.deepEqual(
        new Set((await getForks(id)).map((fork) => fork.data.id)),
        new Set(['viz2', 'viz3', 'viz4'])
      );
    });
  });
};
