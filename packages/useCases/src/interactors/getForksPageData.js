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
    const { owner, id, offset, includePrivate } = requestModel;

    if (!owner) {
      throw new Error("Error: no owner");
    }

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
