import { useEffect, useState } from 'react';

export const useRealtimeModules = () => {
  const [realtimeModules, setRealtimeModules] = useState();
  useEffect(() => {
    import('./realtimeModules').then(setRealtimeModules);
  }, []);
  return realtimeModules;
};
