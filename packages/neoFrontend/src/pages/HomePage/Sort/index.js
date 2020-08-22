import React from 'react';
import { VizzesSortForm } from '../../../VizzesGrid/VizzesSortForm';
import { Container } from './styles';

export const Sort = (props) => {
  return (
    <Container>
      <VizzesSortForm {...props} />
    </Container>
  );
};
