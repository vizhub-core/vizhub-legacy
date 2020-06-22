import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

// The number of vizzes shown in a page of content.
// Infinite scroll pagination fetches the next page.
const pageSize = 100;

const aggregateStagesMap = {
  forksCount: [
    {$lookup: {from: DOCUMENT_INFO, localField: "_id", foreignField: "forkedFrom", as: "forks"}},
    {$addFields: {"forksCount": {$size: "$forks"}}},
    {$project: {forks: 0}},
    {$sort: {forksCount: -1}}
  ],
  lastUpdatedTimestamp: [
    {$sort: {lastUpdatedTimestamp: -1}}
  ]
}

export const getHomePageVisualizationInfos = (connection) => async ({ offset, sort }) => {
  const sortAggregateStages = aggregateStagesMap[sort || 'lastUpdatedTimestamp'];

  const mongoQuery = {
    // $aggregate: [
      // {$match: {
      //   documentType: VISUALIZATION_TYPE,
      //   privacy: { $ne: 'private' },
      // }},
      // {$skip: offset * pageSize},
      // {$limit: pageSize},
      // ...sortAggregateStages
    // ]
  };

  console.log(JSON.stringify(mongoQuery));

  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );

  console.log(results);

  // Uncomment to introduce delay for manual testing.
  //const foo = await new Promise(resolve => {setTimeout(() => resolve(), 3000);});
  return results.map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data));
};
