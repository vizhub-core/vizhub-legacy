import { DocumentInfo } from './documentInfo';
import { VISUALIZATION_TYPE } from './documentTypes';

// The options for sorting views of many visualizations.
export const VIZ_INFO_SORT_OPTIONS = [
  {
    id: 'mostRecent', // Used in URL param
    label: 'Most recent', // Used in UI
    vizInfoProperty: 'lastUpdatedTimestamp', // Used in DB query
    isDefault: true, // Used in URL logic
  },
  {
    id: 'mostForked',
    label: 'Most forked',
    vizInfoProperty: 'forksCount',
  },
  //{
  //  id: 'upvotes',
  //  label: 'Most upvoted',
  //  vizInfoProperty: 'upvotes',
  //},
];

export const VIZ_INFO_DEFAULT_SORT_OPTION = VIZ_INFO_SORT_OPTIONS.find(
  ({ isDefault }) => isDefault
);

export class VisualizationInfo extends DocumentInfo {
  constructor(data) {
    super({
      documentType: VISUALIZATION_TYPE,
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,
      createdTimestamp: data.createdTimestamp,
      lastUpdatedTimestamp: data.lastUpdatedTimestamp,
    });

    // The visualization that this visualization was forked from.
    this.forkedFrom = data.forkedFrom;

    this.forksCount = data.forksCount || 0;

    this.height = data.height;

    // The Unix timestamp at which the thumbnail and preview
    // images for this visualization were last updated.
    // A value of undefined means there were never any images generated.
    this.imagesUpdatedTimestamp = data.imagesUpdatedTimestamp;

    // An array of objects with propertes:
    //  - userId - the ID of the user whose vote this is
    //  - timestamp - the unix timestamp at which the vote was cast.
    this.upvotes = data.upvotes;

    // A value that determines the privacy level of this viz.
    // Possible values include:
    //  - undefined or null means public visibility
    //  - "public" also means public visibility
    //  - "private" means visible only to collaborators
    this.privacy = data.privacy;

    // Boolean, whether or not anyone who can see the document can edit it.
    this.anyoneCanEdit = data.anyoneCanEdit;

    // The array of collaborators.
    // Each collaborator object has a userId field.
    this.collaborators = data.collaborators;
  }
}
