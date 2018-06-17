import { computeReferences } from './computeReferences';

export const VisualizationPresenter = gateway => id => (
  gateway.fetchDocument(id).then(visualization => {
    const references = computeReferences(visualization.files);
    return Promise
      .all([
        Promise.all(references.map(gateway.fetchDocument)),
        gateway.fetchUser(visualization.owner)
      ])
      .then((referencedDocuments, owner) => ({
        visualization,
        references,
        referencedDocuments,
        owner
      }));
  })
);
