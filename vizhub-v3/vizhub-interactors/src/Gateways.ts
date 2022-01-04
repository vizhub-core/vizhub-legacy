import { VizId, VizInfo, VizContent } from 'vizhub-entities';

// These gateways define external interfaces that interactors use.
//
// Corresponds to the "gateways" concept from Clean Architecture.
// See https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
export interface Gateways {
  saveVizInfo(viz: VizInfo): Promise<null>;
  getVizInfo(vizId: VizId): Promise<VizInfo>;

  saveVizContent(viz: VizContent): Promise<null>;
  getVizContent(vizId: VizId): Promise<VizContent>;
}
