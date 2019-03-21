import React, {useRef, useState, useEffect} from 'react';

const runtime = (iframe, viz) => {
  const run = () => iframe.setAttribute('srcDoc', srcDoc(viz));
  run();

  const update = op => {
    if (jsChanged(op)) return run();
    if (stateChanged(op)) postStateChangeMessage(op);
    if (cssChanged(op)) postCSSChangeMessage(op);
  };

  viz.on('op', update);
  return () => viz.removeListener('op', runtime.update);
};

export const Runner = () => {
  const iframeRef = useRef();
  const viz = useViz();
  useEffect(() => viz && runtime(iframeRef.current, viz), [viz]);
  return <iframe ref={iframeRef} width={width(viz)} height={height(viz)} />;
};
