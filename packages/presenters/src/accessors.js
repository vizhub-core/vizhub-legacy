import { timestamp } from 'vizhub-entities';

export const vizWidth = 960;
export const defaultVizHeight = 500;

const microHeight = 40 + 30; // bannerHeight + headHeight;

export const getMicroScale = vizHeight => microHeight / vizHeight;

export const getMicroWidth = microScale => microScale * vizWidth;

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

export const getVizHeight = viz => viz.info.height || defaultVizHeight;

export const getVizFiles = viz => viz.content.files;

export const getVizFileIndex = name => viz =>
  getFileIndex(getVizFiles(viz), name);

export const getVizFile = fileIndex => viz => getVizFiles(viz)[fileIndex];

export const getExtension = fileName =>
  fileName.substr(fileName.lastIndexOf('.'));

export const getVizOwner = viz => viz.info.owner;

export const deleteFileOp = (viz, fileName) => {
  const fileIndex = getVizFileIndex(fileName)(viz);
  return [
    {
      p: ['files', fileIndex],
      ld: viz.content.files[fileIndex]
    }
  ];
};

export const extractTitle = html => {
  if (html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
      return titleMatch[1];
    }
  }
  return 'Untitled';
};

export const getVizUpvotes = viz => viz.info.upvotes;

export const getUpvoteCount = upvotes => (upvotes ? upvotes.length : 0);
export const getDidVote = (upvotes, user) =>
  upvotes && user ? upvotes.some(vote => vote.userId === user.id) : false;

// Pushes a new file entry onto the files array.
// newFile is expected to be an object with "name" and "text" properties.
export const fileCreateOp = (files, newFile) => [
  {
    p: ['files', files.length],
    li: newFile
  }
];

const textDiffOp = (oldText, newText, path, realtimeModules) => {
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldText, newText, diffMatchPatch);
  op.forEach(opComponent => {
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
          oi: newPrivacy
        }
      ];

const defaultVizAnyoneCanEdit = false;
export const getVizAnyoneCanEdit = viz => viz.info.anyoneCanEdit || defaultVizAnyoneCanEdit;
export const anyoneCanEditChangeOp = (oldAnyoneCanEdit, newAnyoneCanEdit, realtimeModules) =>
  // Initialize the anyoneCanEdit field if needed.
  [
    {
      p: ['anyoneCanEdit'],
      oi: !!newAnyoneCanEdit, // Convert truthiness to boolean.
      od: oldAnyoneCanEdit
    }
  ];

export const heightChangeOp = (oldHeight, newHeight, realtimeModules) =>
  // Initialize the height field if needed.
  [
    {
      p: ['height'],
      oi: +newHeight,
      od: oldHeight
    }
  ];

export const upvoteOp = (userId, upvotes) => {
  const op = [];

  // Initialize the upvote field if needed.
  if (!upvotes) {
    op.push({
      p: ['upvotes'],
      oi: []
    });
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
      li: {
        userId,
        timestamp: timestamp()
      }
    });
  } else {
    // otherwise, remove the existing vote
    op.push({
      p: ['upvotes', voteIndex],
      ld: upvote
    });
  }
  return op;
};

export const getUserName = user => user && user.userName;
export const getUserFullName = user => user && (user.fullName || user.userName);

const defaultVizPrivacy = 'public';
export const getVizPrivacy = viz => viz.info.privacy || defaultVizPrivacy;
export const getVizInfo = viz => viz.info;
