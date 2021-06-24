const copyKeys = (keys) => (data) =>
  data
    ? keys.reduce((accumulator, key) => {
        accumulator[key] = data[key];
        return accumulator;
      }, {})
    : null;

export const VizInfo = copyKeys([
  'id',
  'owner',
  'title',
  'slug',
  'description',
  'createdTimestamp',
  'lastUpdatedTimestamp',

  // The visualization that this visualization was forked from.
  'forkedFrom',

  // The number of forks this viz has.
  // Updatable via query across entire database at once.
  // Also updated incrementally as forks are created.
  'forksCount',

  // The height of the viz in pixels.
  'height',

  // The Unix timestamp at which the thumbnail and preview
  // images for this visualization were last updated.
  // A value of undefined means there were never any images generated.
  'imagesUpdatedTimestamp',

  // An array of objects with propertes:
  //  - userId - the ID of the user whose vote this is
  //  - timestamp - the unix timestamp at which the vote was cast.
  'upvotes',

  // A value that determines the privacy level of this viz.
  // Possible values include:
  //  - undefined or null means public visibility
  //  - "public" also means public visibility
  //  - "private" means visible only to collaborators
  'privacy',

  // Boolean, whether or not anyone who can see the document can edit it.
  'anyoneCanEdit',

  // The array of collaborators.
  // Each collaborator object has a userId field.
  'collaborators',
]);
