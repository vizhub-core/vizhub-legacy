import React, { useContext } from 'react';
import { VizContext } from './VizContext';
import { classed } from '../../isomorphic/classed';

const Wrapper = classed('viz-page');
const Title = classed('title');

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const { title } = vizInfo;
  const { files } = vizContent;

  return (
    <Wrapper>
      <Title>{title}</Title>
      {files ? files.map((file, i) => <div key={i}>{file.name}</div>) : null}
    </Wrapper>
  );
};
