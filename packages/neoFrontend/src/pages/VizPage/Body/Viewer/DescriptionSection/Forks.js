import React, { useContext } from 'react';
import { ForksLink } from '../../../../../ForksLink';
import { VizPageDataContext } from '../../../VizPageDataContext';

export const Forks = ({ ownerUser }) => {
  // Forks count is only present in the initial payload from the API.
  // The field is not present in the ShareDB document,
  // so we need to access it like this.
  const vizPageData = useContext(VizPageDataContext);
  const id = vizPageData.visualization.id;
  const forksCount = vizPageData.visualization.info.forksCount;

  return (
    <ForksLink 
      vizId={id}
      forksCount={forksCount}
      ownerUser={ownerUser}
    />
  );
};
