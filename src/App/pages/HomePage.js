import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('home-page');

const VizPreview = ({ vizInfo, ownerUser }) => {
  const { id, title } = vizInfo;

  // Should never happen, but being defensive so it doesn't crash.
  const userName = ownerUser ? ownerUser.userName : 'undefined';

  return <a href={`/${userName}/${id}`}>{title}</a>;
};

export const HomePage = ({ vizInfos, ownerUsersMap }) => (
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
