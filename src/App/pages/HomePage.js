import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('home-page');

const VizPreview = ({ vizInfo }) => {
  const { id, title } = vizInfo;
  return <a href={`/todoAddUser/${id}`}>{title}</a>;
};

export const HomePage = ({ vizInfos }) => {
  return (
    <>
      <Navigation />
      <Wrapper>
        {vizInfos.map((vizInfo) => (
          <VizPreview key={vizInfo.id} vizInfo={vizInfo} />
        ))}
      </Wrapper>
    </>
  );
};
