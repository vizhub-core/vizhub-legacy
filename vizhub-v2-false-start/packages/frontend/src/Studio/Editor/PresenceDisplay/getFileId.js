// Gets the file ID in the presence path.
// This is the file that the presence is "in".
// The presence should be hidden if the current user
// is not also "in" the same file.
export const getFileId = presence => presence.p[presence.p.length - 2];
