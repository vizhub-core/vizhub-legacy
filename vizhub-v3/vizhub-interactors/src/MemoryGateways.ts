import { VizId, VizInfo, VizContent, UserId, User } from 'vizhub-entities';
import { Gateways } from './Gateways';
import {
  vizInfoNotFound,
  vizContentNotFound,
  userNotFound,
  userNotFoundByEmails,
} from './errors';

// Fake snapshot
const snapshot = (data) => ({ data, v: 1, type: 'json1' });

// An in-memory implementation for gateways,
// for use in unit tests (faster than using Mongo).
export const MemoryGateways = (): Gateways => {
  const vizInfoById: { [id: VizId]: VizInfo } = {};

  const vizContentById: { [id: VizId]: VizContent } = {};

  const userById: { [id: UserId]: User } = {};

  return {
    saveVizInfo: async (vizInfo) => {
      vizInfoById[vizInfo.id] = vizInfo;
    },

    getVizInfoSnapshot: (vizId) => {
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

    getVizContentSnapshot: (vizId) => {
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

    saveUser: async (user) => {
      userById[user.id] = user;
    },

    getUserSnapshot: (userId) => {
      const user = userById[userId];
      return user
        ? Promise.resolve(snapshot(user))
        : Promise.reject(userNotFound(userId));
    },

    getUserSnapshotByEmails: (emails) => {
      const user = Object.values(userById).find((user) =>
        user.emails.find((email) => emails.includes(email))
      );
      return user
        ? Promise.resolve(snapshot(user))
        : Promise.reject(userNotFoundByEmails(emails));
    },

    deleteUser: async (userId) => {
      delete userById[userId];
    },
  };
};
