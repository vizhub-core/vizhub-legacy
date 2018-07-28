const prefix = name => `vizhub-app/${name}`;

export const START_BUILD = prefix('START_BUILD');
export const BUILD_ERROR = prefix('BUILD_ERROR');
export const SET_CSRF_TOKEN = prefix('SET_CSRF_TOKEN');
export const SET_VISUALIZATION = prefix('SET_VISUALIZATION');
