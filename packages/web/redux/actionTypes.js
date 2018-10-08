const prefix = name => `vizhub-app/${name}`;

export const START_BUILD = prefix('START_BUILD');
export const BUILD_ERROR = prefix('BUILD_ERROR');
export const SET_CSRF_TOKEN = prefix('SET_CSRF_TOKEN');
export const SET_VISUALIZATION = prefix('SET_VISUALIZATION');
export const VISUALIZATION_DELETE_SUCCESS = prefix('VISUALIZATION_DELETE_SUCCESS');
export const VISUALIZATION_DELETE_ERROR = prefix('VISUALIZATION_DELETE_ERROR');
export const SET_USER = prefix('SET_USER');
