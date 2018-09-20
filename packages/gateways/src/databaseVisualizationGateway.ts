import {
  VisualizationGateway,
  CVRequest,
  CVResponse
} from 'datavis-tech-use-cases';

import {
  Visualization,
  VisualizationInfo,
  VisualizationContent
} from 'datavis-tech-entities';

export class DatabaseVisualizationGateway implements VisualizationGateway {
  database: any; // TODO Typescript - Database

  constructor(database) {
    this.database = database;
  }

  async createVisualization(options): Promise<CVResponse> {
    const {
      owner,
      id,
      title,
      slug,
      description,
      files,
      forkedFrom
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
        thumbnail: undefined
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

  async saveVisualization({ visualization }) {
    return await this.database.saveVisualization({ visualization });
  }

  async getVisualizationInfosByUserId(id) {
    return await this.database.getVisualizationInfosByUserId(id);
  };

  async getAllVisualizationInfos() {
    return await this.database.getAllVisualizationInfos();
  };
}
