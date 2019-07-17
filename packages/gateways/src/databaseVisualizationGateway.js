import {
  Visualization,
  VisualizationInfo,
  VisualizationContent
} from 'vizhub-entities';

export class DatabaseVisualizationGateway {
  constructor(database) {
    this.database = database;
  }

  async createVisualization(options) {
    const {
      owner,
      id,
      title,
      slug,
      description,
      files,
      forkedFrom,
      height,
      createdTimestamp,
      lastUpdatedTimestamp
    } = options;

    const visualization = new Visualization({
      visualizationInfo: new VisualizationInfo({
        id,
        owner,
        title,
        slug,
        description,

        references: [],
        referencedBy: [],
        forks: [],
        forkedFrom,
        thumbnail: undefined,
        height,

        createdTimestamp,
        lastUpdatedTimestamp
      }),
      visualizationContent: new VisualizationContent({
        id,
        files
      })
    });

    return await this.database.createVisualization(visualization);
  }

  async getVisualization({ id }) {
    return await this.database.getVisualization({ id });
  }

  async getVisualizationInfo({ id }) {
    return await this.database.getVisualizationInfo({ id });
  }

  async saveVisualization({ visualization }) {
    return await this.database.saveVisualization({ visualization });
  }

  async getVisualizationInfosByUserId(id) {
    return await this.database.getVisualizationInfosByUserId(id);
  }

  async getAllVisualizationInfos() {
    return await this.database.getAllVisualizationInfos();
  }

  async deleteVisualization({ id }) {
    return await this.database.deleteVisualization({ id });
  }

  async setImagesUpdatedTimestamp(options) {
    return await this.database.setImagesUpdatedTimestamp(options);
  }
}
