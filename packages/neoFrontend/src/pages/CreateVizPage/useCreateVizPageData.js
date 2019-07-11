import { useState, useEffect } from 'react';
import { animationDelay } from '../../LoadingScreen';

// TODO make an API request here, for the list of template and popular vizzes.
export const useCreateVizPageData = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, animationDelay);
  }, []);
  return !loading;
};
