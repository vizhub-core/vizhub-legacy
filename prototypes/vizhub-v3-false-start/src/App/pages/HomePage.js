import React, { useState } from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';
import { VizPreview } from '../VizPreview';

const Wrapper = classed('home-page');
const VizPreviewCollection = classed('viz-preview-collection');

export const HomePage = ({ vizInfos, ownerUsersById }) => {
  return (
    <>
      <Navigation linkLogoToHome={false} />
      <Wrapper>
        <VizPreviewCollection>
          {vizInfos.map((vizInfo) => (
            <VizPreview
              key={vizInfo.id}
              vizInfo={vizInfo}
              ownerUser={ownerUsersById[vizInfo.owner]}
            />
          ))}
        </VizPreviewCollection>
      </Wrapper>
    </>
  );
};
