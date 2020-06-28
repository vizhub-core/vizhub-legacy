export const showUpvote = true;
export const showHeadShare = true;
export const showCollaborators = true;
export const showCollaboratorsAnyoneCanEdit = true;
export const showCollaboratorsManagement = true;

export const showPricing = false;

export const showDownvote = false;
export const showCreatedDate = false;
export const showHeadPullRequest = false;
export const showVideoThumbnail = false;
export const showVisualEditor = false;
export const showMobileConsole = false;
export const renameFileWithoutPath = false;
export const showEmbed = false;
export const showSortOptions = true;
export const showForksCount = true;

// List of usernames who have access to
// private viz feature.
const core = ['ci', 'curran', 'nitanagdeote'];

const stamen = [
  'vinaydixit',
  'almccon',
  'alecburch',
  'swvogt',
  'loganwilliams',
  'colinsullivan',
  'schroedermarc',
  'aaamira',
];

// 1 Year of VizHub Pro
const kickstarter = [
  'KoSMik9',
  'afraser',
  'alangwilson',
  'mochabits',
  'JunyanL',
  'leonardsip',
  'pfmiriks',
  'romkey',
  'rdwong',
  'kirkdebaets',
  'tejbir-singh',
  'mrwatson-de',
];

// Backers who get 2 years of "VizHub Pro".
const kickstarter2years = [
  'seemantk',
  'aarondake', // Did not select reward but gave $300
  'mbsmrtic', // Did not select reward but gave $100
];

//showPrivacySettings(me, vizInfo)
const whitelist = core
  .concat(stamen)
  .concat(kickstarter)
  .concat(kickstarter2years);

// Gateway to the private viz feature.
export const showPrivacySettings = (user, vizInfo) =>
  user ? vizInfo.owner === user.id && whitelist.includes(user.userName) : false;
