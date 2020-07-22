import React from 'react';
import { VizzesSortForm } from '../../../VizzesGrid/VizzesSortForm';
import { Container, Header } from './styles';

export const Sort = (props) => {
  return (

    <Container>
      <Header>VizHub Community</Header>
      <VizzesSortForm {...props} />
    </Container>
  );
};
