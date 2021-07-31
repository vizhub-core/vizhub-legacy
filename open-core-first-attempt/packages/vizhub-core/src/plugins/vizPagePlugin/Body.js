import React, { useContext } from 'react';
import { getHeight } from '../../entities/VizInfo';
import { classed } from '../../isomorphic/classed';
import { isClient } from '../../isomorphic/isClient';
import { VizContext } from './VizContext';
import { SecondaryModulesContext } from './SecondaryModulesContext';
import { renderREADME } from './renderREADME';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title');
const MarkdownBody = classed('markdown-body');

// Grab server-rendered HTML to use for initial hydration,
// before marked and DOMPurify have been loaded.
const serverRenderedReadmeHTML = isClient
  ? document.getElementById('readme').innerHTML
  : null;

const getReadmeHTML = (vizContent, secondaryModules) => {
  return secondaryModules
    ? renderREADME(vizContent, secondaryModules)
    : serverRenderedReadmeHTML;
};

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const secondaryModules = useContext(SecondaryModulesContext);

  const { title } = vizInfo;
  const height = getHeight(vizInfo);
  const readmeHTML = getReadmeHTML(vizContent, secondaryModules);

  return (
    <Wrapper>
      <VizViewer>
        <VizFrame viewBox={`0 0 960 ${height}`} />
        <Title>{title}</Title>
        <MarkdownBody
          id="readme"
          dangerouslySetInnerHTML={{ __html: readmeHTML }}
        />
      </VizViewer>
    </Wrapper>
  );
};
