import { VizId, VizInfo, VizContent, Snapshot, User } from 'vizhub-entities';

// These gateways define external interfaces that interactors use.
//
// Corresponds to the "gateways" concept from Clean Architecture.
// See https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
export interface Gateways {
  saveVizInfo(viz: VizInfo): Promise<void>;
  getVizInfoSnapshot(vizId: VizId): Promise<Snapshot<VizInfo>>;
  deleteVizInfo(vizId: VizId): Promise<void>;

  saveVizContent(viz: VizContent): Promise<void>;
  getVizContentSnapshot(vizId: VizId): Promise<Snapshot<VizContent>>;
  deleteVizContent(vizId: VizId): Promise<void>;

  getForks(vizId: VizId): Promise<Array<Snapshot<VizInfo>>>;

  saveUser(user: User): Promise<void>;
  getUserSnapshot(userId: UserId): Promise<Snapshot<User>>;
  getUserSnapshotByEmails(emails: Array<string>): Promise<Snapshot<User>>;
  deleteUser(userId: UserId): Promise<void>;
}
