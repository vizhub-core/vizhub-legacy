import { Visualization, Images } from 'vizhub-entities';

export interface ImageGeneratorGateway {
  generateImages(visualization: Visualization, waitTime: number | undefined): Promise<Images>;
}
