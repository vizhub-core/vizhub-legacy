import * as assert from 'assert';
import { describe, it, beforeEach } from 'mocha';
import { Gateways } from '../src/Gateways';
import { MemoryGateways } from '../src/MemoryGateways';
import { ForkViz } from '../src/ForkViz';
import { DeleteViz } from '../src/DeleteViz';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../src/errors';
import { primordialViz, ts2, ts3, ts4 } from './fixtures';

describe('Gateways & Interactors', () => {
  let gateways: Gateways;

  beforeEach(async () => {
    gateways = MemoryGateways();
  });

  it('saveVizInfo & getVizInfo', async () => {
    const { saveVizInfo, getVizInfo } = gateways;
    const { vizInfo } = primordialViz;
    await saveVizInfo(vizInfo);
    assert.deepEqual(await getVizInfo(vizInfo.id), vizInfo);
  });

  it('saveVizContent & getVizContent', async () => {
    const { saveVizContent, getVizContent } = gateways;
    const { vizContent } = primordialViz;
    await saveVizContent(vizContent);
    assert.deepEqual(await getVizContent(vizContent.id), vizContent);
  });

  it('getVizContent error case VIZ_INFO_NOT_FOUND', () =>
    gateways.getVizInfo('unknown-id').then(
      () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_INFO_NOT_FOUND);
      }
    ));

  it('getVizContent error case VIZ_CONTENT_NOT_FOUND', () =>
    gateways.getVizContent('unknown-id').then(
      () => Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
      }
    ));

  it('deleteVizInfo', async () => {
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
    const { saveVizContent, deleteVizContent } = gateways;
    const { vizContent } = primordialViz;
    await saveVizContent(vizContent);
    await deleteVizContent(vizContent.id);
    await gateways.getVizContent(vizContent.id).then(
      () => Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
      }
    );
  });

  it('ForkViz', async () => {
    const newVizId = 'viz2';
    const newOwner = 'user2';
    const forkedFrom = primordialViz.id;
    const timestamp = ts2;

    const { saveVizInfo, getVizInfo, saveVizContent, getVizContent } = gateways;
    const { vizContent, vizInfo } = primordialViz;
    await saveVizInfo(vizInfo);
    await saveVizContent(vizContent);

    const forkViz = ForkViz(gateways);

    await forkViz({ newVizId, newOwner, forkedFrom, timestamp });

    assert.deepEqual(await getVizInfo(newVizId), {
      ...vizInfo,
      id: newVizId,
      owner: newOwner,
      forkedFrom,
      createdTimestamp: timestamp,
      lastUpdatedTimestamp: timestamp,
    });

    assert.deepEqual(await getVizContent(newVizId), {
      ...vizContent,
      id: newVizId,
    });
  });

  it('forkViz error case VIZ_INFO_NOT_FOUND', () => {
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

  it('getForks', async () => {
    const { saveVizInfo, getForks } = gateways;
    const { id, vizInfo, vizContent } = primordialViz;
    await saveVizInfo(vizInfo);

    await saveVizInfo({ ...vizInfo, id: 'viz2', forkedFrom: id });
    await saveVizInfo({ ...vizInfo, id: 'viz3', forkedFrom: id });

    assert.deepEqual(
      new Set((await getForks(id)).map((fork) => fork.id)),
      new Set(['viz2', 'viz3'])
    );

    await saveVizInfo({ ...vizInfo, id: 'viz4', forkedFrom: id });

    assert.deepEqual(
      new Set((await getForks(id)).map((fork) => fork.id)),
      new Set(['viz2', 'viz3', 'viz4'])
    );
  });

  it('DeleteViz', async () => {
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

    assert.equal((await getVizInfo('viz2')).forkedFrom, 'viz1');
    assert.equal((await getVizInfo('viz5')).forkedFrom, 'viz2');
    assert.equal((await getVizInfo('viz6')).forkedFrom, 'viz2');

    await deleteViz('viz2');

    assert.equal((await getVizInfo('viz5')).forkedFrom, 'viz1');
    assert.equal((await getVizInfo('viz6')).forkedFrom, 'viz1');

    await gateways.getVizInfo('viz2').then(
      () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_INFO_NOT_FOUND);
      }
    );

    await gateways.getVizContent('viz2').then(
      () => Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
      }
    );
  });
});
