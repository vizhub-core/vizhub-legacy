import React, { useContext } from 'react';
import { getHeight } from '../../entities/VizInfo';
import { classed } from '../../isomorphic/classed';
import { VizContext } from './VizContext';
import { SecondaryModulesContext } from './SecondaryModulesContext';
import { renderREADME } from './renderREADME';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title');

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const { title } = vizInfo;
  const height = getHeight(vizInfo);

  // TODO leverage this to build bundles.
  const secondaryModules = useContext(SecondaryModulesContext);
  console.log('secondaryModules:');
  console.log(secondaryModules);

  const readmeHTML = renderREADME(vizContent);

  return (
    <Wrapper>
      <VizViewer>
        <VizFrame viewBox={`0 0 960 ${height}`} />
        <Title>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: readmeHTML }} />
      </VizViewer>
    </Wrapper>
  );
};
