import React, { createContext, useContext, useState, useRef } from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { defaultVizHeight, vizWidth } from '../../../constants';
import { IFrame } from './styles';

export const VizRunnerContext = createContext();

export const VizRunnerProvider = ({ children }) => {
  const iFrameRef = useRef();
  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = visualization.info.height || defaultVizHeight;

  const [vizRunnerTransform, setVizRunnerTransform] = useState({
    x: 0,
    y: 0,
    scale: 1
  });

  const contextValue = { setVizRunnerTransform };

  const { x, y, scale } = vizRunnerTransform;

  return (
    <>
      <VizRunnerContext.Provider value={contextValue}>
        {children}
      </VizRunnerContext.Provider>
      <IFrame
        src="https://vizhub.com/curran/d53bb1e4cefc44a09d11cc3af81f521a/fullscreen"
        ref={iFrameRef}
        width={vizWidth}
        height={vizHeight}
        style={{
          transform: `translate(${x}px, ${y}px) scale(${scale})`
        }}
      />
    </>
  );
};
