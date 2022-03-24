import { SaveViz, ForkViz, DeleteViz } from 'vizhub-interactors';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
  VIZ_INFO_NOT_FOUND,
} from 'vizhub-interactors/constants';
import { primordialViz } from 'vizhub-interactors/test/fixtures';

// Simulate users editing vizzes. Simulates:
//  * Forking
//  * Deleting
//  * Editing title
export const vizBot = ({ gateways, shareDBConnection }) => {
  const saveViz = SaveViz(gateways);

  // Initialize the database with sample content.
  saveViz(primordialViz);

  // Gets a random viz id.
  const randomVizId = () =>
    new Promise((resolve, reject) => {
      shareDBConnection.createFetchQuery(
        VIZ_INFO_COLLECTION,
        {},
        {},
        (error, results) => {
          if (results.length > 0) {
            const i = Math.floor(Math.random() * results.length);
            const vizId = results[i].data.id;
            resolve(vizId);
          } else {
            resolve(null);
          }
        }
      );
    });

  // Test real-time updates of the title.
  setInterval(async () => {
    const vizId = await randomVizId();
    const vizInfo = (await gateways.getVizInfoSnapshot(vizId)).data;
    gateways.saveVizInfo({ ...vizInfo, title: '' + Math.random() });
  }, 1200);

  // Fork a random viz repeatedly
  // to test real-time updates when adding entries to query results.
  const forkViz = ForkViz(gateways);
  setInterval(async () => {
    const newVizId = 'viz' + Math.random();
    const newOwner = 'user' + Math.random();
    const forkedFrom = await randomVizId();
    const timestamp = Date.now() / 1000;

    forkViz({ newVizId, newOwner, forkedFrom, timestamp });
  }, 1800);

  // Periodically delete a random viz.
  // to test real-time updates when removing entries to query results.
  const deleteViz = DeleteViz(gateways);
  setInterval(async () => {
    const vizId = await randomVizId();
    if (vizId) {
      deleteViz(vizId);
    }
  }, 3100);
};
