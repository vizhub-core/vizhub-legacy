import React, { useMemo, useContext } from 'react';
import { format } from 'd3-format';
import { VizPageDataContext } from '../../../VizPageDataContext';
import { VizLink } from './styles';

const formatForksCount = format(',');

export const Forks = ({ ownerUser }) => {

  // Forks count is only present in the initial payload from the API.
  // The field is not present in the ShareDB document,
  // so we need to access it like this.
  const vizPageData = useContext(VizPageDataContext);
  const id = vizPageData.visualization.id;
  const forksCount = vizPageData.visualization.info.forksCount;

  const forksCounterElement = useMemo(() => {
    const forksCountFormatted = formatForksCount(forksCount);
    const text = `${forksCountFormatted} fork${forksCount === 1 ? '' : 's'}`;

    return forksCount > 0 ? (
      <VizLink
        to={`/${ownerUser.username}/${id}/forks`}
      >
        {text}
      </VizLink>
    ) : text;
  }, [
    id,
    ownerUser,
    forksCount,
  ]);

  return (
    <div>
      {forksCounterElement}
    </div>
  );
};
