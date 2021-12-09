import React, { useMemo } from 'react';
import { format } from 'd3-format';
import { Wrapper, VizLink } from './styles';

const formatForksCount = format(',');

export const ForksLink = ({ vizId, forksCount, ownerUser, isSmall = false }) =>
  useMemo(() => {
    const forksCountFormatted = formatForksCount(forksCount);
    const text = `${forksCountFormatted} fork${forksCount === 1 ? '' : 's'}`;

    return (
      <Wrapper isSmall={isSmall}>
        {ownerUser && forksCount > 0 ? (
          <VizLink to={`/${ownerUser.userName}/${vizId}/forks`}>{text}</VizLink>
        ) : (
          text
        )}
      </Wrapper>
    );
  }, [vizId, ownerUser, forksCount, isSmall]);
