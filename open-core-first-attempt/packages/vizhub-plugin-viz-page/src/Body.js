import React, { useContext } from 'react';
import { getHeight, classed } from 'vizhub-core';
import { VizContext } from './VizContext';
import { Readme } from './Readme';
import { Navigation } from './Navigation';
import { Head } from './Head';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title');

export const Body = () => {
  const { vizInfo } = useContext(VizContext);
  const { title } = vizInfo;
  const height = getHeight(vizInfo);

  return (
    <Wrapper>
      <Navigation />
      <Head />
      <VizViewer>
        <VizFrame viewBox={`0 0 960 ${height}`} />
        <Title>{title}</Title>
        <Readme />
        {/* TODO License */}
      </VizViewer>
    </Wrapper>
  );
};
