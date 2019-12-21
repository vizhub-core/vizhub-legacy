import { getVizInfo } from './getVizInfo';
import { DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';

export const vizWrite = (request, callback) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    op,
    collection,
    snapshot
  } = request;

  // Only vet ops against viz info and content documents.
  if (collection !== DOCUMENT_CONTENT && collection === DOCUMENT_INFO){
    return callback();
  }

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return callback();
  }

  // For all ops, owner must be the logged in user.
  if (!userId) {
    return callback('You must be logged in to edit.');
  }

  // Do nothing in the case of create and delete ops.
  // TODO check that owner matches in case of create ops
  // TODO check that owner matches in case of delete ops
  if (op && (op.create || op.del)) {
    return callback();
  }

  return getVizInfo(collection, snapshot)
    .then(vizInfo => {

      // Let anyone add or remove their own upvotes to any viz.
      if (op && op.op && op.op.length > 0 && op.op[0].p[0] === 'upvotes') {
        for (let i = 0; i < op.op.length; i++) {
          const c = op.op[i];

          // Validate the upvote initialization op.
          // Looks like this: { p: [ 'upvotes' ], oi: [] }
          if (c.p[0] === 'upvotes' && c.p.length == 1) {
            if (JSON.stringify(c.oi) !== '[]') {
              return callback('Unauthorized vote manipulation.');
            }
          }

          // Validate the upvote addition or deletion ops.
          // Looks like this:
          // {
          //   p: [ 'upvotes', 0 ],
          //   li: { userId: '47895473289547832938754', timestamp: 1569094989 }
          // }
          // Or like this:
          // {
          //   p: [ 'upvotes', 0 ],
          //   ld: { userId: '47895473289547832938754', timestamp: 1569094989 }
          // }
          if (c.p[0] === 'upvotes' && c.p.length == 2) {
            const entry = c.li || c.ld;
            if (entry) {
              // Users may only submit ops that change their own entries.
              if (entry.userId !== userId) {
                return callback('Unauthorized vote manipulation.');
              }
            } else {
              return callback('Unauthorized vote manipulation.');
            }
          }
        }

        return callback();
      }

      // Don't let people edit other people's stuff.
      if (vizInfo.owner !== userId) {
        return callback('This visualization is unforked. Fork to save edits.');
      }

      // Explicitly whitelist conditions for allowed ops.
      if (vizInfo.owner === userId) {
        return callback();
      }

      callback('Case not handled');

    })
    .catch(error => callback(error));


  // TODO this might be useful when we add collaborators in future.
  //// Check that the user is either the owner or a collaborator.
  //if (owner !== userId) {
  //  const ids = (collaborators || []).map(({id}) => id)
  //  const isCollaborator = ids.filter(id => id === userId).length
  //  if (!isCollaborator) {
  //    return callback('You must be the owner of this document or a collaborator in order to edit it.')
  //  }
  //}
};
