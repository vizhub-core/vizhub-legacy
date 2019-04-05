import { useState, useEffect } from 'react';
import { getConnection } from './getConnection';

export const useVizShareDB = (vizId, vizSnapshots) => {
  const [viz, setViz] = useState();

  useEffect(() => {
    const connection = getConnection();
    const viz = connection.get('viz', vizId);

    // TODO check case of navigating between Viz pages
    // if(!viz.type) {
    viz.ingestSnapshot(vizSnapshots[vizId]);
    // }

    viz.subscribe(function(err) {
      if (err) throw err;
      setViz(viz);
    });
  }, [vizId]);

  return viz;
};
