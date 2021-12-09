import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Button';
import { Title, DevsOnly } from '../styles';

export const FromScratchSection = () =>
  process.env.NODE_ENV === 'development' ? (
    <>
      <DevsOnly>
        <Title>For developers only</Title>
      </DevsOnly>
      <Link to="creating-viz-from-scratch">
        <Button className="test-create-viz-from-scratch">From Scratch</Button>
      </Link>
    </>
  ) : null;
