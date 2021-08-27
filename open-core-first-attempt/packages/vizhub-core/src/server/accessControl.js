const vizRead = (context, next) => {
  const { collection, snapshots, snapshotType } = context;
  console.log(snapshots);
  // TODO use new data model, so that
  // we don't need to execute any additional fetches
  // for vizInfo when we are figuring out access for
  // a vizContent doc. These two should be unified into
  // a single document type.
  next();
};

// Disallow all writes for now.
const vizWrite = (context, next) => {
  next(new Error('Unauthorized'));
};

// See https://share.github.io/sharedb/middleware/
export const accessControl = (shareDB) => {
  shareDB.use('readSnapshots', vizRead);

  // Note: The snapshot has not yet been fetched.
  //If you want to make any changes or assertions involving the snapshot,
  //that should be done in the apply or commit hooks.
  // TODO We might want to use('apply', vizWrite), so that we can
  // access the snapshot which contains ownership and collaborator permissions.
  shareDB.use('submit', vizWrite);
};
