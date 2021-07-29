import React, { useContext } from 'react';
import { getHeight } from '../../entities/VizInfo';
import { VizContext } from './VizContext';
import { classed } from '../../isomorphic/classed';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame');
const Title = classed('title');

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const { title } = vizInfo;
  const height = getHeight(vizInfo);
  // const { files } = vizContent;
  // {files ? files.map((file, i) => <div key={i}>{file.name}</div>) : null}

  return (
    <Wrapper>
      <VizViewer>
        <VizFrame style={{ height: height + 'px' }} />
        <Title>{title}</Title>
      </VizViewer>
    </Wrapper>
  );
};
