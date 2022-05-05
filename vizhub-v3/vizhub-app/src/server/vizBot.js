import { SaveViz, ForkViz, DeleteViz } from 'vizhub-interactors';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
  VIZ_INFO_NOT_FOUND,
} from 'vizhub-interactors/constants';
import { ts1 } from 'vizhub-interactors/test/fixtures';

const firstViz = {
  id: 'viz1',
  vizInfo: {
    id: 'viz1',
    owner: 'user1',
    title: 'Primordial Viz',
    createdTimestamp: ts1,
    lastUpdatedTimestamp: ts1,
  },
  vizContent: {
    id: 'viz1',
    files: {
      7548392: {
        name: 'index.js',
        text: 'export const main = () => { console.log("Hello"); };',
      },
      4258474: {
        name: 'package.json',
        text: '{ "dependencies": { "d3": "7.4.4" } }',
      },
    },
  },
};

// Simulate users editing vizzes. Simulates:
//  * Forking
//  * Deleting
//  * Editing title
export const vizBot = ({ gateways, shareDBConnection }) => {
  const saveViz = SaveViz(gateways);

  // Initialize the database with sample content.
  saveViz(firstViz);

  // Gets a random viz id.
  const randomVizId = (avoidPrimordialViz) =>
    new Promise((resolve, reject) => {
      shareDBConnection.createFetchQuery(
        VIZ_INFO_COLLECTION,
        {},
        {},
        (error, results) => {
          if (results.length > (avoidPrimordialViz ? 1 : 0)) {
            // Never pick the primordial viz, so it's stable for manual testing.
            const i = avoidPrimordialViz
              ? 1 + Math.floor(Math.random() * (results.length - 1))
              : Math.floor(Math.random() * results.length);

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
    const vizId = await randomVizId(true);
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
    const vizId = await randomVizId(true);
    if (vizId) {
      deleteViz(vizId);
    }
  }, 3100);
};
