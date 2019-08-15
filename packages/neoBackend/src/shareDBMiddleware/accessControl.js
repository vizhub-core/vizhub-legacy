//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')

export const accessControl = (request, done) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    owner
  } = request;

  // Let the server do whatever the fuck it wants.
  if (isServer) {
    return done();
  }

  // For all ops, owner must be the logged in user.
  if (!userId) {
    return done('You must be logged in to edit.');
  }

  // Don't let people edit other people's stuff.
  if (owner !== userId) {
    return done("You can't edit this because it's not yours");
  }

  done();

  // TODO this might be useful when we add collaborators in future.
  //// Check that the user is either the owner or a collaborator.
  //if (owner !== userId) {
  //  const ids = (collaborators || []).map(({id}) => id)
  //  const isCollaborator = ids.filter(id => id === userId).length
  //  if (!isCollaborator) {
  //    return done('You must be the owner of this document or a collaborator in order to edit it.')
  //  }
  //}
};
