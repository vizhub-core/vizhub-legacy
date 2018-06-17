import { createVisualization } from 'datavis-tech-use-cases';

export const Gateway = database => ({
  createVisualization: data => {
    const action = createVisualization(data);
    return action.type === 'error'
      ? Promise.reject(new Error(action.message))
      : database.createVisualization(action.data);
  }
});
