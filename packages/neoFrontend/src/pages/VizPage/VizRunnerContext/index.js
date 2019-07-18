import React, { createContext, useState, useLayoutEffect } from 'react';

export const VizRunnerContext = createContext();

export const VizRunnerProvider = ({ children }) => {
  const [vizRunnerIFrame, setVizRunnerIFrame] = useState();

  useLayoutEffect(() => {
    const iFrame = document.createElement('iframe');
    iFrame.setAttribute(
      'src',
      'https://vizhub.com/curran/7ff25d963fbe460387ba07ac4c6494c6/fullscreen'
    );
    setVizRunnerIFrame(iFrame);
    return () => iFrame.remove();
  }, []);

  return vizRunnerIFrame ? (
    <VizRunnerContext.Provider value={{ vizRunnerIFrame }}>
      {children}
    </VizRunnerContext.Provider>
  ) : null;
};
