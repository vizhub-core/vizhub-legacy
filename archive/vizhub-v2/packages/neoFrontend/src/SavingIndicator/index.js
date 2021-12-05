import React from 'react';
import { Flex } from '../styles';
import { Indicator, Text } from './styles';

export const SavingIndicator = ({ saving }) => (
  <Flex alignItems="center">
    <Text>{saving ? 'Saving...' : 'Saved'}</Text>
    <Indicator saving={saving} />
  </Flex>
);
