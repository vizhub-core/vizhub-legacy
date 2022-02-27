import { VizId, VizInfo, VizContent } from 'vizhub-entities';
import { Gateways } from './Gateways';
import { vizInfoNotFound, vizContentNotFound } from './errors';

// Fake snapshot
const snapshot = (data) => ({ data, v: 1, type: 'json1' });

// An in-memory implementation for gateways,
// for use in unit tests (faster than using Mongo).
export const MemoryGateways = (): Gateways => {
  const vizInfoById: { [id: VizId]: VizInfo } = {};

  const vizContentById: { [id: VizId]: VizContent } = {};

  return {
    saveVizInfo: async (vizInfo) => {
      vizInfoById[vizInfo.id] = vizInfo;
    },

    getVizInfo: (vizId) => {
      const vizInfo = vizInfoById[vizId];
      return vizInfo
        ? Promise.resolve(snapshot(vizInfo))
        : Promise.reject(vizInfoNotFound(vizId));
    },

    deleteVizInfo: async (vizId) => {
      delete vizInfoById[vizId];
    },

    saveVizContent: async (vizContent) => {
      vizContentById[vizContent.id] = vizContent;
    },

    getVizContent: (vizId) => {
      const vizContent = vizContentById[vizId];
      return vizContent
        ? Promise.resolve(snapshot(vizContent))
        : Promise.reject(vizContentNotFound(vizId));
    },

    deleteVizContent: async (vizId) => {
      delete vizContentById[vizId];
    },

    getForks: async (vizId) =>
      Object.values(vizInfoById)
        .filter((vizInfo) => vizInfo.forkedFrom === vizId)
        .map(snapshot),
  };
};
