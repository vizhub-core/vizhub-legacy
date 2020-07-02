import React, { useMemo } from 'react';
import { format } from 'd3-format';
import { VizLink } from './styles';

const formatForksCount = format(',');

export const ForksLink = ({ vizId, forksCount, ownerUser }) => {
  const forksCounterElement = useMemo(() => {
    const forksCountFormatted = formatForksCount(forksCount);
    const text = `${forksCountFormatted} fork${forksCount === 1 ? '' : 's'}`;

    return ownerUser && forksCount > 0 ? (
      <VizLink to={`/${ownerUser.userName}/${vizId}/forks`}>{text}</VizLink>
    ) : (
      text
    );
  }, [vizId, ownerUser, forksCount]);

  return <div>{forksCounterElement}</div>;
};
