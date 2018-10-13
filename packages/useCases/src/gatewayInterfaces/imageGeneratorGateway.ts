import { Visualization, Images } from 'datavis-tech-entities';

export interface ImageGeneratorGateway {
  generateImages(visualization: Visualization): Promise<Images>;
}
