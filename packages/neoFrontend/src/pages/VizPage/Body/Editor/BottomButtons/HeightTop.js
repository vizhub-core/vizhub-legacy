import React from 'react';
import { TopList, TopListItem } from './styles';

export const HeightTop = ({ onHeightClick }) => (
  <TopList>
    <TopListItem onClick={onHeightClick} className="test-height">
      set height
    </TopListItem>
  </TopList>
);
