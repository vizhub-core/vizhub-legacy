export const getCsrfToken = state => state.csrfToken;
export const getVisualization = state => state.visualization;
export const getUser = state => state.user;
export const getUserName = state => (getUser(state) || {}).userName;
export const getShowForkInvitation = state => state.showForkInvitation;
