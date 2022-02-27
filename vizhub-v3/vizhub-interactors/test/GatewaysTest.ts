import * as assert from 'assert';
import { describe, it } from 'mocha';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../src/errors';
import { primordialViz } from './fixtures';
import { initGateways } from './initGateways';

export const GatewaysTest = () => {
  describe('Gateways & Interactors', () => {
    it('saveVizInfo & getVizInfo', async () => {
      const gateways = initGateways();
      const { saveVizInfo, getVizInfo } = gateways;
      const { vizInfo } = primordialViz;
      await saveVizInfo(vizInfo);
      assert.deepEqual((await getVizInfo(vizInfo.id)).data, vizInfo);
    });

    it('saveVizContent & getVizContent', async () => {
      const gateways = initGateways();
      const { saveVizContent, getVizContent } = gateways;
      const { vizContent } = primordialViz;
      await saveVizContent(vizContent);
      assert.deepEqual((await getVizContent(vizContent.id)).data, vizContent);
    });

    it('getVizContent error case VIZ_INFO_NOT_FOUND', () => {
      const gateways = initGateways();
      return gateways.getVizInfo('unknown-id').then(
        () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
        (error) => {
          assert.equal(error.name, 'VizHubError');
          assert.equal(error.code, VIZ_INFO_NOT_FOUND);
        }
      );
    });

    it('getVizContent error case VIZ_CONTENT_NOT_FOUND', () => {
      const gateways = initGateways();
      return gateways.getVizContent('unknown-id').then(
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

      await gateways.getVizInfo(vizInfo.id).then(
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
      await gateways.getVizContent(vizContent.id).then(
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
