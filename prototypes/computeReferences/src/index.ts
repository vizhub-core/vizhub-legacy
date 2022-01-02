import { computeReferences } from './computeReferences';
import { CVResponse } from 'vizhub-use-cases';

export interface VisualizationViewModel {
  references: string[]
}

export async function presentVisualization (): Promise<VisualizationViewModel> {
  const references = await computeReferences();
  return { references };
};

//export const presentVisualization = gateway => ({
//  presentVisualization: id => (
//    gateway.fetchDocument(id).then(async visualization => {
//      //return await Promise
//      //  .all([
//      //    Promise.all(references.map(gateway.fetchDocument)),
//      //    gateway.fetchUser(visualization.owner)
//      //  ])
//      //  .then((referencedDocuments, owner) => ({
//      //    visualization,
//      //    references,
//      //    referencedDocuments,
//      //    owner
//      //  }));
//    })
//  )
//});
