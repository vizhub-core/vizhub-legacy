import React from 'react';
import { Wrapper } from './styles';
//import React, {useRef, useState, useEffect} from 'react';

// TODO handle first page load using srcDoc from server.
// TODO load ShareDB and Rollup dependencies async as needed only.
//const runtime = (iframe, viz) => {
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
  //
  // Aha! Use srcDoc as a separate hook,
  // so it can use server-generated or local-generated,
  // depending on context.
  //
  const { srcDoc, srcDocHash } = useSrcDoc();

  //useEffect(() => {
  //  iframeRef.current.setAttribute('srcDoc', srcDoc);
  //}, [srcDocHash]);
  //
  // This can also kick in once
  // useRuntimePostMessages();
  return <Wrapper />;
};
