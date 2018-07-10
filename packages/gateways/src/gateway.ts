import { createVisualization } from './createVisualization';
import { Visualization } from 'datavis-tech-entities';

export const Gateway = database => ({

  createVisualization: async (data) => {
    const result = createVisualization(data);

    if (result instanceof Visualization) {
      return await database.createVisualization(result);
    }

    if (result instanceof Error) {
      throw result;
    }
  },

  getVisualization: database.getVisualization,

  saveVisualization: database.saveVisualization

});
