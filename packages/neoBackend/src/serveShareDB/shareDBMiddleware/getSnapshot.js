// Extracts the document snapshot from the ShareDB request.
// TODO is this really the way?
export const getSnapshot = (request, callback) => {
  const { snapshot, snapshots } = request;

  // This is the structure we get on 'apply' middleware.
  if (snapshot) {
    return callback(null, snapshot);
  } else if (snapshots) {

    // This is the structure we get on 'readSnapshots' middleware.
    if(snapshots.length === 1){
      return callback(null, snapshots[0]);
    } else {
      return callback(new Error('Case of multiple documents not handled'));
    }
  }
};
