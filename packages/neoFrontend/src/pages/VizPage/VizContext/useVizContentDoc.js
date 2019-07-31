import { useEffect } from 'react';

export const useVizContentDoc = realtimeModules => {
  useEffect(() => {
    console.log('here');
    if (!realtimeModules) {
      return;
    }
    const { connection } = realtimeModules;
    console.log(connection);
  }, [realtimeModules]);
};
