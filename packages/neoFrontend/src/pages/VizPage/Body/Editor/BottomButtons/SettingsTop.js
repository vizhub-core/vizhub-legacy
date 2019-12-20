import React from 'react';
import { TopList, TopListItem } from './styles';

export const SettingsTop = ({ onPrivacyClick }) => (
  <TopList>
    <TopListItem onClick={onPrivacyClick} className="test-privacy">
      privacy
    </TopListItem>
  </TopList>
);
