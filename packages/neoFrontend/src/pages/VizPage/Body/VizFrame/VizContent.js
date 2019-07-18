import React, { useRef, useContext, useEffect } from 'react';
import { VizRunnerContext } from '../../VizRunnerContext';
import { Content } from './styles';

export const VizContent = ({ height }) => {
  const contentRef = useRef();
  const { vizRunnerIFrame } = useContext(VizRunnerContext);

  useEffect(() => {
    const content = contentRef.current;
    content.appendChild(vizRunnerIFrame);
    return () => {
      content.removeChild(vizRunnerIFrame);
    };
  }, [vizRunnerIFrame]);

  return <Content ref={contentRef} style={{ height }} />;
};
