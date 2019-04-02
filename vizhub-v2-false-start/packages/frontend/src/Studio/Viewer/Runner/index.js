import React, { useRef, useEffect } from 'react';
import hash from '@emotion/hash';
import { IFrame } from './styles';

const html = files =>
  Object.values(files).find(file => file.path === './index.html') || {};
const useSrcDoc = files => html(files).text;

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

export const Runner = ({ vizData }) => {
  const iframeRef = useRef();
  // const viz = useViz();
  // useEffect(() => viz && runtime(iframeRef.current, viz), [viz]);
  // return <iframe ref={iframeRef} width={width(viz)} height={height(viz)} />;
  //
  // useRuntimePostMessages();
  //
  // Aha! Use srcDoc as a separate hook,
  // so it can use server-generated or local-generated,
  // depending on context.
  const srcDoc = useSrcDoc(vizData.working.files);
  console.log(srcDoc);

  useEffect(() => {
    iframeRef.current.setAttribute('srcDoc', srcDoc);
  }, [hash(srcDoc)]);

  return <IFrame ref={iframeRef} width="300" height="200" />;
};
