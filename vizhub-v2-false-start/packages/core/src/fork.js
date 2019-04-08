export const fork = ({
  vizId,
  vizData,
  forkVizId,
  forkOwnerUserId,
  forkPublishDateISOString
}) => ({
  vizId: forkVizId,
  vizData: Object.assign({}, vizData, {
    ownerUserId: forkOwnerUserId,
    publishDateISOString: forkPublishDateISOString,
    forkedFromVizId: vizId,
    viewCount: 0,
    upvotes: 0,
    downvotes: 0
  })
});
