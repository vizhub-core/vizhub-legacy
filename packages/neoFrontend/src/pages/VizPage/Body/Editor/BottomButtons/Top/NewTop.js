import React from 'react';
import { TopList, TopListItem } from './styles';

export const NewTop = ({ onNewFileListItemClick }) => (
  <TopList>
    <TopListItem onClick={onNewFileListItemClick}>new file</TopListItem>
  </TopList>
);
// <TopListItem>new directory</TopListItem>
