import { Visualization, timestamp } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'
import { ImageStorageGateway } from '../gatewayInterfaces/imageStorageGateway'
import { ImageGeneratorGateway } from '../gatewayInterfaces/imageGeneratorGateway'

// Queries for visualizations that need updated thumbnail and preview images,
// then creates new images for one of them.
export class UpdateImages implements Interactor {
  visualizationGateway: VisualizationGateway;
  imageGeneratorGateway: ImageGeneratorGateway;
  imageStorageGateway: ImageStorageGateway;
  waitTime: number;

  constructor(gateways, waitTime) {
    this.visualizationGateway = gateways.visualizationGateway;
    this.imageGeneratorGateway = gateways.imageGeneratorGateway;
    this.imageStorageGateway = gateways.imageStorageGateway;
    this.waitTime = waitTime;
  }

  async execute() {

    const visualizationsInfos = await this.visualizationGateway
      .getAllVisualizationInfos();

    const visualizationInfosNeedingThumbnails = visualizationsInfos
      .filter(({ lastUpdatedTimestamp, imagesUpdatedTimestamp }) => {
        // Include visualizations where either
        return imagesUpdatedTimestamp
          // the images are outdated,
          ? imagesUpdatedTimestamp < lastUpdatedTimestamp 
          // or no images were ever generated.
          : true;
      });

    if (visualizationInfosNeedingThumbnails.length > 0) {
      const imagesUpdatedTimestamp = timestamp();
      const id = visualizationInfosNeedingThumbnails[0].id;
      const visualization = await this.visualizationGateway.getVisualization({ id });
      const images = await this.imageGeneratorGateway.generateImages(visualization, this.waitTime);

      return await Promise.all([
        this.imageStorageGateway.updateImages({
          id,
          images
        }),
        this.visualizationGateway.setImagesUpdatedTimestamp({
          id,
          imagesUpdatedTimestamp
        })
      ]);
    }
  }
}
