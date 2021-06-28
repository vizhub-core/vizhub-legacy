import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('home-page');

export const HomePage = ({ vizInfos }) => {
  return (
    <>
      <Navigation />
      <Wrapper>
        {vizInfos.map(({ title, id }) => (
          <a href={`/todoAddUser/${id}`} key={id}>
            {title}
          </a>
        ))}
      </Wrapper>
    </>
  );
};
