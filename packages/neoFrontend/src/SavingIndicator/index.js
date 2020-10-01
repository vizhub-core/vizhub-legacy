import React from 'react';
import { Flex } from '../styles';
import { Indicator, Text } from './styles';

export const SavingIndicator = ({ saving }) => {
  return (
    <Flex alignItems="center">
      <Text>{saving ? 'Saving...' : 'Saved Globally'}</Text>
      <Indicator saving={saving} />
    </Flex>
  );
};
