export interface Viz {
  vizInfo: VizInfo;
  vizContent: VizContent;
}

export type VizId = string;

export interface VizInfo {
  id: VizId;
  owner: UserId;
  authors: Array<UserId>;
}

export interface VizContent {
  id: VizId;
}

export type UserId = string;

export interface User {
  id: UserId;
}
