import { createVisualization } from 'datavis-tech-use-cases';

export const VisualizationGateway = db => ({
  createVisualization: data => {
    const action = createVisualization(data);
    return action.type === 'error'
      ? Promise.reject(new Error(action.message))
      : db.createVisualization(action.data);
  }
});
