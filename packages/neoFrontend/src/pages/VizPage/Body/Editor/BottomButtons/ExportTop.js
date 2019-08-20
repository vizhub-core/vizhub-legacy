import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { TopList, TopListItem } from './styles';

export const ExportTop = () => {
  const { vizId } = useContext(URLStateContext);
  return (
    <TopList>
      <a
        href={`/api/visualization/export/${vizId}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Download the code for this visualization"
      >
        <TopListItem>export</TopListItem>
      </a>
    </TopList>
  );
};
// <TopListItem>new directory</TopListItem>
