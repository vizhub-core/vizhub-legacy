//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')
import { DOCUMENT_CONTENT, DOCUMENT_INFO, fetchShareDBDoc } from 'vizhub-database';

export const accessControl = (shareDB, connection) => {

  // Populates request.owner with the user id of the owner of the document
  // to which the op is being applied.
  shareDB.use('apply', (request, done) => {
    const { collection, snapshot, op, id } = request;

    // Do nothing in the case of create ops.
    if (op.create){
      return done();
    }

    // For info documents and migrated content documents,
    // expose the owner ID as request.owner .
    if (snapshot.data.owner) {
      request.owner = snapshot.data.owner;
      console.log('owner exists! ' + request.owner);
      return done();
    }

    // Handle migration case, where owner ID is not present on content documents.
    if (collection === DOCUMENT_CONTENT && !snapshot.data.owner) {

      // Guard against middleware triggered from setting the owner.
      if(op.op.length === 1){
        if(op.op[0].p.length === 1 ){
          if(op.op[0].p[0] === 'owner'){
            return done();
          }
        }
      }

      // Query for corresponding info document
      fetchShareDBDoc(DOCUMENT_INFO, id, connection)
        .then(infoDoc => {
          const { owner } = infoDoc.data ;
          request.owner = owner;
          done();

          // Populate original doc with this owner.
          // Note that this is outside the middleware control flow.
          fetchShareDBDoc(DOCUMENT_CONTENT, id, connection)
            .then(contentDoc => {
              contentDoc.submitOp([{
                p: ['owner'],
                oi: owner
              }]);
            });
        });
    }
  });

  // This middleware applies access control rules to all ops (changes).
  shareDB.use('apply', (request, done) => {

    // Unpack the ShareDB request object.
    const {
      collection,
      op,
      agent: {
        isServer,
        userId
      },
      snapshot
    } = request;

    console.log('inside second middleware, owner ID is ' + request.owner);
    console.log({isServer, userId});


    //if(op.create){
    //  console.log(JSON.stringify(op, null, 2));
    //}

    //// Get the owner id.
    //const { owner } =
    //  op.create
    //    ? (op.create.data || {}) // Handle the case of a creation op.
    //    : snapshot.data // Handle ops on an existing document.

    //// Get the collaborators.
    //const collaborators = get(snapshot, 'data.collaborators')

    //// Access control rules:

    //// Allow server code to do anything (e.g. create and update User entries).
    //if (isServer) {
    //  return done()
    //}

    //// Anyone can increment a view count.
    //if (isIncrementViewCount(op)) {
    //  return done()
    //}

    //// For all ops, owner must be the logged in user.
    //if (!userId) {
    //  return done('You must be logged in to edit.')
    //}

    //// Check that the user is either the owner or a collaborator.
    //if (owner !== userId) {
    //  const ids = (collaborators || []).map(({id}) => id)
    //  const isCollaborator = ids.filter(id => id === userId).length
    //  if (!isCollaborator) {
    //    return done('You must be the owner of this document or a collaborator in order to edit it.')
    //  }
    //}

    done();
  });
};
