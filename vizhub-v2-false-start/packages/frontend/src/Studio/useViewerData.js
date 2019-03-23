import { useState, useEffect } from 'react';

// TODO load data from server API / gateway.
// This will contain all the data required for the studio page:
//  - Logged in user profile and preferences.
//  - Visualization metadata
//  - Visualization description
//  - Server-computed srcDoc
const sampleViewerData = {
  // userData,
  // vizData,
  // vizSrcDoc
};

export const useViewerData = () => {
  const [viewerData, setViewerData] = useState();
  useEffect(() => {
    setTimeout(() => {
      setViewerData(sampleViewerData);
    }, 1000);
  }, []);
  return viewerData;
};
