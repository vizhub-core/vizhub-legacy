import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';
import { VizPreview } from '../VizPreview';

const Wrapper = classed('home-page');
const VizPreviewCollection = classed('viz-preview-collection');

export const HomePage = ({ vizInfos, ownerUsersById }) => (
  <>
    <Navigation />
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
