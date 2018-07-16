import { Visualization, Files } from 'datavis-tech-entities';

export interface VisualizationViewModel {
  files: Files;
  title: string;
  width: number;
  height: number;
  visualization: Visualization;
}

export function visualizationToViewModel(visualization: Visualization) {
  const viewModel: VisualizationViewModel = {
    files: visualization.content.files,
    title: visualization.info.title,
    width: 960, // visualization.info.width,
    height: 500, // visualization.info.height
    visualization
  }
  return viewModel;
}
