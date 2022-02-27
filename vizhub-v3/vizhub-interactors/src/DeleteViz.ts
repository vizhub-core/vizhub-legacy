import { VizId, VizInfo } from 'vizhub-entities';
import { Gateways } from './Gateways';

export const DeleteViz = (gateways: Gateways) => {
  const { getVizInfo, saveVizInfo, deleteVizInfo, deleteVizContent, getForks } =
    gateways;

  return async (vizId: VizId): Promise<void> => {
    const vizInfo = (await getVizInfo(vizId)).data;
    const { forkedFrom } = vizInfo;

    // For each fork forked from the viz to be deleted,
    // update its forkedFrom reference to the viz that the
    // viz to be deleted was forked from (tree node removal).
    const forks: Array<Snapshot<VizInfo>> = (await getForks(vizId)).map(
      (snapshot) => snapshot.data
    );
    const updateForkedFrom = (fork) => saveVizInfo({ ...fork, forkedFrom });
    await Promise.all(forks.map(updateForkedFrom));

    await Promise.all([deleteVizInfo(vizId), deleteVizContent(vizId)]);
  };
};
