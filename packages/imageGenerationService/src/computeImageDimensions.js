export const computeImageDimensions = ({ actual, desired }) =>
  actual.width / actual.height < desired.width / desired.height
    ?
      {
        width: desired.width,
        height: Math.round(actual.height / actual.width * desired.width)
      }
    :
      {
        width: Math.round(actual.width / actual.height * desired.height),
        height: desired.height
      };
