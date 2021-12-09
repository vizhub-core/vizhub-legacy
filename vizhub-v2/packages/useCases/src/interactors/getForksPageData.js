import { GetVisualizationInfo } from './getVisualizationInfo';
import { GetForks } from './getForks';

export class GetForksPageData {
  constructor({ visualizationGateway, userGateway }) {
    this.getVisualization = new GetVisualizationInfo({
      visualizationGateway,
    });
    this.getForks = new GetForks({ visualizationGateway, userGateway });
  }

  async execute(requestModel) {
    const { id, offset, includePrivate } = requestModel;

    const [visualizationInfo, forksData] = await Promise.all([
      this.getVisualization.execute({ id }),
      this.getForks.execute({
        forkedFrom: id,
        offset,
        includePrivate,
      }),
    ]);

    return { ...forksData, ...visualizationInfo };
  }
}
