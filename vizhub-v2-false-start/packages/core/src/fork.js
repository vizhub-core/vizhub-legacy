export const fork = ({ vizId, vizData, ownerUserId, publishDateISOString }) =>
  Object.assign({}, vizData, {
    ownerUserId,
    publishDateISOString,
    forkedFromVizId: vizId,
    viewCount: 0,
    upvotes: 0,
    downvotes: 0
  });
