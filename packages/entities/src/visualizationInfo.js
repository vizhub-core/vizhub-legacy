import { DocumentInfo } from './documentInfo';
import { VISUALIZATION_TYPE } from './documentTypes';

const isStaging = process.env.REACT_APP_VIZHUB_IS_STAGING;

// The options for sorting views of many visualizations.
export const VIZ_INFO_SORT_OPTIONS = [
  {
    id: 'mostRecent', // Used in URL param
    label: 'Most recent', // Used in UI
    vizInfoProperty: 'lastUpdatedTimestamp', // Used in DB query
  },
  {
    id: 'mostForked',
    label: 'Most forked',
    vizInfoProperty: 'forksCount',
  },
  {
    id: 'mostUpvoted',
    label: 'Most upvoted',
    vizInfoProperty: 'upvotesCount',
  },
  {
    id: 'popular',
    label: 'Most popular',
    vizInfoProperty: 'scoreHackerHotLastUpdated',
    isDefault: true, // Used in URL logic
  },
];

if (isStaging) {
  VIZ_INFO_SORT_OPTIONS.push([
    { id: 'wilson', label: 'Wilson Score', vizInfoProperty: 'scoreWilson' },
    {
      id: 'reddit-hot-created',
      label: 'Reddit Hot (created date)',
      vizInfoProperty: 'scoreRedditHotCreated',
    },
    {
      id: 'hacker-hot-created',
      label: 'Hacker Hot (created date)',
      vizInfoProperty: 'scoreHackerHotCreated',
    },
    {
      id: 'reddit-hot-updated',
      label: 'Reddit Hot (updated date)',
      vizInfoProperty: 'scoreRedditHotLastUpdated',
    },
    {
      id: 'hacker-hot-updated',
      label: 'Hacker Hot (updated date)',
      vizInfoProperty: 'scoreHackerHotLastUpdated',
    },
  ]);
}

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
