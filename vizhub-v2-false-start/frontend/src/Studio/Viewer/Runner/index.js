import React from 'react';
import { Wrapper } from './styles';
//import React, {useRef, useState, useEffect} from 'react';

// TODO handle first page load using srcDoc from server.
// TODO load Rollup dependency async as needed only.
//const runtime = (iframe, viz) => {
//  const run = () => iframe.setAttribute('srcDoc', srcDoc(viz));
//  run();
//
//  const update = op => {
//    if (jsChanged(op)) return run();
//    if (stateChanged(op)) postStateChangeMessage(op);
//    if (cssChanged(op)) postCSSChangeMessage(op);
//  };
//
//  viz.on('op', update);
//  return () => viz.removeListener('op', runtime.update);
//};

export const Runner = () => {
  // const iframeRef = useRef();
  // const viz = useViz();
  // useEffect(() => viz && runtime(iframeRef.current, viz), [viz]);
  // return <iframe ref={iframeRef} width={width(viz)} height={height(viz)} />;
  return <Wrapper />;
};
