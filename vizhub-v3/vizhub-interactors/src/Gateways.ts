import { VizId, VizInfo, VizContent } from 'vizhub-entities';

// These gateways define external interfaces that interactors use.
//
// Corresponds to the "gateways" concept from Clean Architecture.
// See https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
export interface Gateways {
  saveVizInfo(viz: VizInfo): Promise<void>;
  getVizInfo(vizId: VizId): Promise<VizInfo>;
  deleteVizInfo(vizId: VizId): Promise<void>;

  saveVizContent(viz: VizContent): Promise<void>;
  getVizContent(vizId: VizId): Promise<VizContent>;
  deleteVizContent(vizId: VizId): Promise<void>;

  getForks(vizId: VizId): Promise<Array<VizInfo>>;
}
