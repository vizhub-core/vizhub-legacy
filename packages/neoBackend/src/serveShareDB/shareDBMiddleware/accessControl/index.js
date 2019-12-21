export const accessControl = (request, done) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    vizInfo,
    op
  } = request;

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return done();
  }

  // For all ops, owner must be the logged in user.
  if (!userId) {
    return done('You must be logged in to edit.');
  }

  // Let anyone add or remove their own upvotes.
  if (op && op.op && op.op.length > 0 && op.op[0].p[0] === 'upvotes') {
    for (let i = 0; i < op.op.length; i++) {
      const c = op.op[i];

      // Validate the upvote initialization op.
      // Looks like this: { p: [ 'upvotes' ], oi: [] }
      if (c.p[0] === 'upvotes' && c.p.length == 1) {
        if (JSON.stringify(c.oi) !== '[]') {
          return done('Unauthorized vote manipulation.');
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
            return done('Unauthorized vote manipulation.');
          }
        } else {
          return done('Unauthorized vote manipulation.');
        }
      }
    }

    return done();
  }

  // Don't let people edit other people's stuff.
  if (vizInfo.owner !== userId) {
    return done('This visualization is unforked. Fork to save edits.');
  }

  // Explicitly whitelist conditions for allowed ops.
  if (vizInfo.owner === userId) {
    return done();
  }

  done('Case not handled');

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
