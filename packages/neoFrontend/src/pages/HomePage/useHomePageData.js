import { useState, useEffect } from 'react';

// TODO make an API request here.
export const useHomePageData = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return !loading;
};
