export interface Viz {
  vizInfo: VizInfo;
  vizContent: VizContent;
}

export type VizId = string;

export interface VizInfo {
  id: VizId;
  owner: User;
}

export interface VizContent {}

export interface User {}
