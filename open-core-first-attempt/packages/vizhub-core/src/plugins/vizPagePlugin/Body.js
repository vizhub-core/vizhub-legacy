import React, { useContext } from 'react';
import { getHeight } from '../../entities/VizInfo';
import { VizContext } from './VizContext';
import { classed } from '../../isomorphic/classed';

const Wrapper = classed('viz-page');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title');

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const { title } = vizInfo;
  const height = getHeight(vizInfo);
  //  const readmeMarkdown = getFileText(vizContent, 'README.md');
  const { files } = vizContent;
  console.log(files);
  // {files ? files.map((file, i) => <div key={i}>{file.name}</div>) : null}

  return (
    <Wrapper>
      <VizViewer>
        <VizFrame viewBox={`0 0 960 ${height}`} />
        <Title>{title}</Title>
      </VizViewer>
    </Wrapper>
  );
};
