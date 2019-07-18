import React, { useRef, useContext, useEffect } from 'react';
import { VizRunnerContext } from '../../VizRunnerContext';
import { Wrapper } from './styles';

export const VizContent = ({ height }) => {
  const contentRef = useRef();
  const { vizRunnerIFrame } = useContext(VizRunnerContext);

  useEffect(() => {
    const content = contentRef.current;
    content.appendChild(vizRunnerIFrame);
  }, [vizRunnerIFrame]);

  return <Wrapper ref={contentRef} style={{ height }} />;
};
