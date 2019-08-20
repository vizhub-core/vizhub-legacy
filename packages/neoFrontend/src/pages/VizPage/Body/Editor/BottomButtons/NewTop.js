import React from 'react';
import { TopList, TopListItem } from './styles';

export const NewTop = ({ onNewFileClick }) => (
  <TopList>
    <TopListItem onClick={onNewFileClick}>new file</TopListItem>
  </TopList>
);
// <TopListItem>new directory</TopListItem>
