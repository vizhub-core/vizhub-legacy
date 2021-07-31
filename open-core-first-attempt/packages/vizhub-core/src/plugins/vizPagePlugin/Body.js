import React, { useContext } from 'react';
import { getHeight } from '../../entities/VizInfo';
import { classed } from '../../isomorphic/classed';
import { VizContext } from './VizContext';
import { useReadmeHTML } from './useReadmeHTML';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title');
const MarkdownBody = classed('markdown-body');

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);

  const { title } = vizInfo;
  const height = getHeight(vizInfo);
  const readmeHTML = useReadmeHTML(vizContent);

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
