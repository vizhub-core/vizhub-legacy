import { createInstance } from './createInstance';

export function VizInfo(data) {
  return createInstance(VizInfo, data);
}

VizInfo.keys = [
  // The unique ID of the document.
  'id',

  // The ID of the user that owns this document.
  'owner',

  // The title of the document.
  'title',

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
];
