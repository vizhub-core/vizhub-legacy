// Generates a function that creates a shallow copy of
// a given object `d`, with only the specified `keys`.
const copyKeys = (keys, newObject, d) =>
  d
    ? keys.reduce((accumulator, key) => {
        accumulator[key] = d[key];
        return accumulator;
      }, newObject)
    : null;

const vizInfoKeys = [
  // The unique ID of the document.
  'id',

  // The ID of the user that owns this document.
  'owner',

  // The title of the document.
  'title',

  // The URL slug for the document.
  'slug',

  // The Markdown description of the document.
  'description',

  // The Unix timestamp at which this document was created.
  'createdTimestamp',

  // The Unix timestamp at which this document was last updated.
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
];

export function VizInfo(vizInfoData) {
  return copyKeys(vizInfoKeys, Object.create(VizInfo.prototype), vizInfoData);
}
