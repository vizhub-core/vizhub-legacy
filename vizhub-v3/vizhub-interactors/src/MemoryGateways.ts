import { VizId, VizInfo, VizContent } from 'vizhub-entities';
import { Gateways } from './Gateways';
import { vizInfoNotFound, vizContentNotFound } from './errors';

// An in-memory implementation for gateways,
// for use in unit tests (faster than using Mongo).
export const MemoryGateways = (): Gateways => {
  const vizInfoById: { [id: VizId]: VizInfo } = {};

  const vizContentById: { [id: VizId]: VizContent } = {};

  return {
    saveVizInfo: (vizInfo) => {
      vizInfoById[vizInfo.id] = vizInfo;
      return Promise.resolve(null);
    },

    getVizInfo: (vizId) => {
      const vizInfo = vizInfoById[vizId];
      return vizInfo
        ? Promise.resolve(vizInfo)
        : Promise.reject(vizInfoNotFound(vizId));
    },

    deleteVizInfo: (vizId) => {
      delete vizInfoById[vizId];
    },

    saveVizContent: (vizContent) => {
      vizContentById[vizContent.id] = vizContent;
      return Promise.resolve(null);
    },

    getVizContent: (vizId) => {
      const vizContent = vizContentById[vizId];
      return vizContent
        ? Promise.resolve(vizContent)
        : Promise.reject(vizContentNotFound(vizId));
    },

    deleteVizContent: (vizId) => {
      delete vizContentById[vizId];
    },
  };
};
