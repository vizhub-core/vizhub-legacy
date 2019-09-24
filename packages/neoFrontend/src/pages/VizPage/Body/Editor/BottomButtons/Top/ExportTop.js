import React from 'react';
import { TopList, TopListItem } from './styles';

export const ExportTop = ({ vizId }) => (
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
// <TopListItem>new directory</TopListItem>
