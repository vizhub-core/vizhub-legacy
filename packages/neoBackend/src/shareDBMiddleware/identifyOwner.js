import { DOCUMENT_CONTENT, DOCUMENT_INFO, fetchShareDBDoc } from 'vizhub-database';

export const identifyOwner = connection => (request, done) => {
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
  }
