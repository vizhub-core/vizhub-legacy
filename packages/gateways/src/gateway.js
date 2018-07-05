import { createVisualization } from './createVisualization';
import { Visualization } from 'datavis-tech-entities';

export const Gateway = database => ({

  createVisualization: data => {
    const result = createVisualization(data);

    if (result instanceof Visualization) {
      return database.createVisualization(result);
    }

    if (result instanceof Error) {
      return Promise.reject(result);
    }
  },

  getVisualization: database.getVisualization,

  saveVisualization: database.saveVisualization

});
