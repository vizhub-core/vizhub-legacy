import { useState, useEffect } from 'react';
import { sampleViewerData } from 'vizhub-core';

export const useViewerData = () => {
  const [viewerData, setViewerData] = useState();
  useEffect(() => {
    setTimeout(() => {
      setViewerData(sampleViewerData);
    }, 1000);
  }, []);
  return viewerData;
};
