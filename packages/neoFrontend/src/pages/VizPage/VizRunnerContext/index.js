import React, { createContext, useState, useLayoutEffect } from 'react';

export const VizRunnerContext = createContext();

export const VizRunnerProvider = ({ children }) => {
  const [vizRunnerIFrame, setVizRunnerIFrame] = useState();

  useLayoutEffect(() => {
    const iFrame = document.createElement('iframe');
    iFrame.setAttribute(
      'src',
      'https://vizhub.com/curran/d53bb1e4cefc44a09d11cc3af81f521a/fullscreen'
    );
    iFrame.style.border = 0;
    iFrame.setAttribute('width', 960);

    // TODO set this dynamically from viz data
    iFrame.setAttribute('height', 500);

    // style={{
    //   transform: `scale(${scale})`,
    //   transformOrigin: '0 0',
    // }}

    setVizRunnerIFrame(iFrame);
  }, []);

  return vizRunnerIFrame ? (
    <VizRunnerContext.Provider value={{ vizRunnerIFrame }}>
      {children}
    </VizRunnerContext.Provider>
  ) : null;
};
