import React from 'react';
import { Wrapper, TabWrapper, TabLabel } from './styles';
export const Tabs = ({ activeTab, onSelect, children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const Tab = ({ id, title }) => (
  <TabWrapper>
    <TabLabel>{title}</TabLabel>
  </TabWrapper>
);
