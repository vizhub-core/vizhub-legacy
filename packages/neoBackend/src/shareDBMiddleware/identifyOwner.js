// Populates request.owner with the owner of the document.
export const identifyOwner = (request, done) => {
  const { vizInfo } = request;

  if (vizInfo) {
    request.owner = vizInfo.owner;
  }

  done();
};
