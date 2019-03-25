import { useState, useEffect } from 'react';
import { sampleStudioData } from 'vizhub-core';

export const useStudioData = () => {
  const [studioData, setStudioData] = useState();
  useEffect(() => {
    setTimeout(() => {
      setStudioData(sampleStudioData);
    }, 1000);
  }, []);
  return studioData;
};
