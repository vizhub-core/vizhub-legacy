import { timestamp } from 'vizhub-entities';

// Queries for visualizations that need updated thumbnail and preview images,
// then creates new images for one of them.
export class UpdateImages {
  constructor(gateways, waitTime) {
    this.visualizationGateway = gateways.visualizationGateway;
    this.imageGeneratorGateway = gateways.imageGeneratorGateway;
    this.imageStorageGateway = gateways.imageStorageGateway;
    this.waitTime = waitTime;
  }

  async execute() {
    const visualizationsInfos = await this.visualizationGateway.getAllVisualizationInfos();

    const visualizationInfosNeedingThumbnails = visualizationsInfos.filter(
      ({ lastUpdatedTimestamp, imagesUpdatedTimestamp }) => {
        // Include visualizations where either
        return imagesUpdatedTimestamp
          ? // the images are outdated,
            imagesUpdatedTimestamp < lastUpdatedTimestamp
          : // or no images were ever generated.
            true;
      }
    );

    const n = visualizationInfosNeedingThumbnails.length;
    if (n > 0) {
      const imagesUpdatedTimestamp = timestamp();

      const vizToUpdate = visualizationInfosNeedingThumbnails[n - 1];

      const id = vizToUpdate.id;
      const visualization = await this.visualizationGateway.getVisualization({
        id,
      });

      console.log(
        'Generating images for ' +
          visualization.info.title +
          ' ' +
          visualization.id
      );

      const images = await this.imageGeneratorGateway.generateImages(
        visualization,
        this.waitTime
      );

      return await Promise.all([
        this.imageStorageGateway.updateImages({
          id,
          images,
        }),
        this.visualizationGateway.setImagesUpdatedTimestamp({
          id,
          imagesUpdatedTimestamp,
        }),
      ]);
    }
  }
}
