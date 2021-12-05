export const request = vizId => ({
  type: 'request',
  vizId
});

export const receive = (vizId, studioData) => ({
  type: 'receive',
  vizId,
  studioData
});
