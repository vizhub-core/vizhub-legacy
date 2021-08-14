import React, { useContext } from 'react';
import { getHeight, classed } from 'vizhub-core';
import { VizContext } from './VizContext';
import { Readme } from './Readme';
import { Navigation } from './Navigation';
import { Head } from './Head';
import { EditorToggleButton, EditorSidebar } from '../Editor';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title');
const VerticalSplit = classed('vertical-split');
const VerticalSplitLeft = classed('vertical-split-left');
const VerticalSplitRight = classed('vertical-split-right');

// TODO expand upon this notion,
// so that we can make other features plugins:
//  - forking
//  - settings
// TODO consider: can plugins have plugins?
//  - e.g. forking as a plugin to viz page plugin
//  - e.g. privacy checkbox as plugin to forking plugin
const headPlugins = [EditorToggleButton];

export const Body = () => {
  const { vizInfo } = useContext(VizContext);
  const { title } = vizInfo;
  const height = getHeight(vizInfo);

  return (
    <Wrapper>
      <Navigation />
      <Head headPlugins={headPlugins} />
      <VerticalSplit>
        <VerticalSplitLeft>
          <EditorSidebar />
        </VerticalSplitLeft>
        <VerticalSplitRight>
          <VizViewer>
            <VizFrame viewBox={`0 0 960 ${height}`} />
            <Title>{title}</Title>
            <Readme />
            {/* TODO License */}
          </VizViewer>
        </VerticalSplitRight>
      </VerticalSplit>
    </Wrapper>
  );
};
