import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('home-page');

const VizPreview = ({ vizInfo, ownerUser }) => {
  const { id, title } = vizInfo;
  return <a href={`/${ownerUser.userName}/${id}`}>{title}</a>;
};

export const HomePage = ({ vizInfos, ownerUsersMap }) => {
  return (
    <>
      <Navigation />
      <Wrapper>
        {vizInfos.map((vizInfo) => (
          <VizPreview
            key={vizInfo.id}
            vizInfo={vizInfo}
            ownerUser={ownerUsersMap.get(vizInfo.owner)}
          />
        ))}
      </Wrapper>
    </>
  );
};
