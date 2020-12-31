import React from 'react';
import { Link } from 'react-router-dom';
import { VizzesSortForm } from '../../../VizzesGrid/VizzesSortForm';
import { Button } from '../../../Button';
import { Container, Header } from './styles';

export const Sort = (props) => {
  return (
    <Container>
      <Header>
        <Link to="/create-viz">
          <Button>Create a Viz</Button>
        </Link>
      </Header>
      <VizzesSortForm {...props} />
    </Container>
  );
};
