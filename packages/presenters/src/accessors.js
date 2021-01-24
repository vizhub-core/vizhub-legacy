import { timestamp } from 'vizhub-entities';

export const vizWidth = 960;
export const defaultVizHeight = 500;

const microHeight = 40 + 30; // bannerHeight + headHeight;

export const getMicroScale = (vizHeight) => microHeight / vizHeight;

export const getMicroWidth = (microScale) => microScale * vizWidth;

export const getFileIndex = (files, name) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].name === name) {
      return i;
    }
  }
  return -1;
};

export const getFile = (files, name) => files[getFileIndex(files, name)];

export const getText = (files, name) => {
  const file = getFile(files, name);
  return file ? file.text : '';
};

export const getVizHeight = (viz) => viz.info.height || defaultVizHeight;

export const getVizTitle = (viz) => viz.info.title;

export const getVizFiles = (viz) => viz.content.files;

export const getVizFileIndex = (name) => (viz) =>
  getFileIndex(getVizFiles(viz), name);

export const getVizFile = (fileIndex) => (viz) => getVizFiles(viz)[fileIndex];

export const getExtension = (fileName) =>
  fileName.substr(fileName.lastIndexOf('.'));

export const getVizOwner = (viz) => viz.info.owner;

export const getVizForksCount = (viz) => viz.info.forksCount;

export const deleteFileOp = (viz, fileName) => {
  const fileIndex = getVizFileIndex(fileName)(viz);
  return [
    {
      p: ['files', fileIndex],
      ld: viz.content.files[fileIndex],
    },
  ];
};

export const extractTitle = (html) => {
  if (html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/is);
    if (titleMatch) {
      return titleMatch[1];
    }
  }
  return 'Untitled';
};

export const getVizInfoOwner = (vizInfo) => vizInfo.owner;
export const isVizInfoPrivate = (vizInfo) =>
  vizInfo.privacy === PRIVACY.private;

export const getVizInfoUpvotes = (vizInfo) => vizInfo.upvotes;
export const getVizUpvotes = (viz) => getVizInfoUpvotes(viz.info);

export const getUpvoteCount = (upvotes) => (upvotes ? upvotes.length : 0);
export const getDidVote = (upvotes, user) =>
  upvotes && user ? upvotes.some((vote) => vote.userId === user.id) : false;

// Pushes a new file entry onto the files array.
// newFile is expected to be an object with "name" and "text" properties.
export const fileCreateOp = (files, newFile) => [
  {
    p: ['files', files.length],
    li: newFile,
  },
];

const textDiffOp = (oldText, newText, path, realtimeModules) => {
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldText, newText, diffMatchPatch);
  op.forEach((opComponent) => {
    opComponent.p = path.concat(opComponent.p);
  });
  return op;
};

export const fileChangeOp = (
  fileIndex,
  oldText,
  newText,
  realtimeModules,
  field = 'text' // Can be 'text' or 'name'
) => textDiffOp(oldText, newText, ['files', fileIndex, field], realtimeModules);

export const titleChangeOp = (oldTitle, newTitle, realtimeModules) =>
  textDiffOp(oldTitle, newTitle, ['title'], realtimeModules);

export const descriptionChangeOp = (
  oldDescription,
  newDescription,
  realtimeModules
) =>
  textDiffOp(oldDescription, newDescription, ['description'], realtimeModules);

export const privacyChangeOp = (oldPrivacy, newPrivacy, realtimeModules) =>
  // Initialize the privacy field if needed.
  oldPrivacy
    ? textDiffOp(oldPrivacy, newPrivacy, ['privacy'], realtimeModules)
    : [
        {
          p: ['privacy'],
          oi: newPrivacy,
        },
      ];

const defaultVizAnyoneCanEdit = false;
export const getVizAnyoneCanEdit = (viz) =>
  viz.info.anyoneCanEdit || defaultVizAnyoneCanEdit;
export const anyoneCanEditChangeOp = (
  oldAnyoneCanEdit,
  newAnyoneCanEdit,
  realtimeModules
) =>
  // Initialize the anyoneCanEdit field if needed.
  [
    {
      p: ['anyoneCanEdit'],
      oi: !!newAnyoneCanEdit, // Convert truthiness to boolean.
      od: oldAnyoneCanEdit,
    },
  ];

export const heightChangeOp = (oldHeight, newHeight) =>
  // Initialize the height field if needed.
  [
    {
      p: ['height'],
      oi: +newHeight,
      od: oldHeight,
    },
  ];

export const upvoteOp = (userId, upvotes) => {
  const op = [];

  // Initialize the upvote field if needed.
  if (!upvotes) {
    op.push({ p: ['upvotes'], oi: [] });
    op.push({ p: ['upvotesCount'], oi: 0 });
  }

  // Did this user already upvote here?
  let voteIndex = -1;
  let upvote;
  for (let i = 0; i < getUpvoteCount(upvotes); i++) {
    upvote = upvotes[i];
    if (upvote.userId === userId) {
      voteIndex = i;
      break;
    }
  }

  // If this user did not vote here,
  if (voteIndex === -1) {
    // then cast the vote.
    op.push({
      p: ['upvotes', 0],
      li: { userId, timestamp: timestamp() },
    });
    // increment upvotesCount
    op.push({ p: ['upvotesCount'], na: 1 });
  } else {
    // otherwise, remove the existing vote
    op.push({ p: ['upvotes', voteIndex], ld: upvote });

    // decrement upvotesCount
    op.push({ p: ['upvotesCount'], na: -1 });
  }
  return op;
};

export const getUserName = (user) => user && user.userName;

// Return the full name of the user, for labeling.
// Falls back to userName if fullName not present.
export const getUserFullName = (user) =>
  user && (user.fullName || user.userName);

export const PRIVACY = {
  public: 'public',
  private: 'private',
};

const defaultVizPrivacy = PRIVACY.public;
export const getVizPrivacy = (viz) => viz.info.privacy || defaultVizPrivacy;
export const getVizInfo = (viz) => viz.info;

const getCollaboratorCount = (collaborators) =>
  collaborators ? collaborators.length : 0;
export const getVizCollaborators = (viz) => viz.info.collaborators || [];
export const addCollaboratorOp = ({
  collaborators,
  collaborator,
  realtimeModules,
}) => {
  if (!collaborator || !collaborator.userId) {
    throw new Error(
      'The "collaborator" argument is expected to be an object with a userId field.'
    );
  }

  const op = [];

  // Initialize the collaborator field if needed.
  // The initial value is an empty array.
  if (!collaborators) {
    op.push({
      p: ['collaborators'],
      oi: [],
    });
  }

  // Is this user already a existingCollaborator here?
  let existingCollaboratorIndex = -1;
  let existingCollaborator;

  // Linear search for this user id in existingCollaborators array.
  for (let i = 0; i < getCollaboratorCount(collaborators); i++) {
    existingCollaborator = collaborators[i];
    if (existingCollaborator.userId === collaborator.userId) {
      existingCollaboratorIndex = i;
      break;
    }
  }

  // If this user did not collaborator here,
  if (existingCollaboratorIndex === -1) {
    // Then add the collaborator.
    op.push({
      p: ['collaborators', 0],

      // collaborator here is expected to be an object
      // with a userId field.
      li: collaborator,
    });
  } else {
    // Otherwise, do nothing.
    // Meaning, don't add the same collaborator twice.
  }

  return op;
};

export const removeCollaboratorOp = ({
  collaborators,
  collaborator,
  realtimeModules,
}) => {
  const op = [];

  // Is this user already a existingCollaborator here?
  let existingCollaboratorIndex = -1;
  let existingCollaborator;

  // Linear search for this user id in existingCollaborators array.
  for (let i = 0; i < getCollaboratorCount(collaborators); i++) {
    existingCollaborator = collaborators[i];
    if (existingCollaborator.userId === collaborator.userId) {
      existingCollaboratorIndex = i;
      break;
    }
  }

  // If this user was not a collaborator, do nothing.
  // (should never happen)
  if (existingCollaboratorIndex === -1) {
    return null;
  } else {
    // otherwise, remove the existing collaborator.
    op.push({
      p: ['collaborators', existingCollaboratorIndex],
      ld: existingCollaborator,
    });
  }
  return op;
};

export const usersMatch = (userA, userB) =>
  userA && userB && userA.id === userB.id;
