import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getAllVisualizationInfos = (connection) => async () => {
  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
  };
  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );
  return (
    results

      // Guard against oddly shaped documents of mysterious origin
      // that are present in the production database, for example:
      // data: { imagesUpdatedTimestamp: 1593086383 }
      // Possibly these are deleted docs that the image generation
      // service attempted to generate images for in the past.
      // Twilight Zone Shit over here.
      .filter(
        (shareDBDoc) =>
          shareDBDoc.data &&
          shareDBDoc.data.id &&
          shareDBDoc.data.id !== '9be4ceba5a3449da8f0176d1a6ec215c'
      )

      .map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data))
  );
};
