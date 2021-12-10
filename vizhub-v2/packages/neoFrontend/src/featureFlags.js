export const showUpvote = true;
export const showHeadShare = true;
export const showCollaborators = true;
export const showCollaboratorsAnyoneCanEdit = true;
export const showCollaboratorsManagement = true;

export const showPricing = false;
export const showEmbed = true;
export const showSnippet = true;
export const showNeoNavBar = true;

export const showDownvote = false;
export const showCreatedDate = false;
export const showHeadPullRequest = false;
export const showVideoThumbnail = false;
export const showVisualEditor = false;
export const showMobileConsole = false;
export const renameFileWithoutPath = false;
export const enableWhiteLabelEmbeding = false;
export const enablePreviewEmbeding = false;
export const showSortOptions = true;
export const showForksCount = true;

export const showAboutLink = true;
export const lintJs = false;

export const showFacebookLogin = false;
export const showGoogleLogin = false;

export const showUserActionsMenuCreateViz = true;
export const showUserActionsProfile = true;

export const packageJSON = true;
export const showProPlan = process.env.REACT_APP_VIZHUB_PRO_PLAN === 'true';
export const showNeoPricing =
  process.env.REACT_APP_VIZHUB_NEO_PRICING === 'true';

export const showAccountPage =
  process.env.REACT_APP_VIZHUB_ACCOUNT_PAGE === 'true';

export const isPayingUser = (user) => true;

// Only show the profile sidebar if:
// * The logged in user has access to private viz feature, and
// * The logged in user is viewing their own profile.
export const showProfileSidebar = (profileUser, me) =>
  me ? profileUser.id === me.id && isPayingUser(me) : false;
