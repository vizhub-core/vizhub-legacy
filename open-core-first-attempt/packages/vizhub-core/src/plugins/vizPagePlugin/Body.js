import React, { useContext } from 'react';
import { VizContext } from './VizContext';
import { classed } from '../../isomorphic/classed';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const Title = classed('title');

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const { title } = vizInfo;
  // const { files } = vizContent;
  // {files ? files.map((file, i) => <div key={i}>{file.name}</div>) : null}

  return (
    <Wrapper>
      <VizViewer>
        <Title>{title}</Title>
      </VizViewer>
    </Wrapper>
  );
};
