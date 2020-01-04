export const showUpvote = true;
export const showDownvote = false;
export const showCreatedDate = false;
export const showHeadPullRequest = false;
export const showHeadShare = false;
export const showHeadSettings = false;
export const showVideoThumbnail = false;
export const showVisualEditor = false;
export const showMobileConsole = false;
export const renameFileWithoutPath = false;

// List of usernames who have access to
// private viz feature.
const whitelist = ['curran', 'nitanagdeote'];

// Gateway to the private viz feature.
export const showEditorSettings = (user, vizInfo) =>
  user ? vizInfo.owner === user.id && whitelist.includes(user.userName) : false;
