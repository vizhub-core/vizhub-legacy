// This module defines types for the "entities" of VizHub.
// Corresponds to the "entities" concept from Clean Architecture.
// See https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

// Unique identifier string for a Viz.
// Common between VizInfo and VizContent for a given Viz.
// This is a UUID v4 string with dashes removed (for ease of URL copying).
export type VizId = string;

// Unique identifier string for a user.
// This is derived from GitHub's user id field.
export type UserId = string;

// A unique ID for a file.
// When the file name changes,
// or files are added/deleted,
// this ID stays the same,
// simplifying things.
export type VizFileId = string;

// A timestamp down to the second.
// milliseconds / 1000
export type Timestamp = number;

// An SPDX license code.
export type License = string;

// A Viz. The central entity of VizHub.
// Its representation is divided between "info" and "content".
// This is done so that listings need to only touch lightweight "info",
// whereas the potentially bulky "content" is only loaded on the
// viz page or elsewhere when the viz needs to be executed or files
// need to be accessed.
export interface Viz {
  id: VizId;
  vizInfo: VizInfo;
  vizContent: VizContent;
}

export interface VizInfo {
  id: VizId;

  // The user that owns this viz.
  owner: UserId;

  // The authors listed for this viz.
  authors?: Array<UserId>;

  // The title of the viz.
  title: string;

  // The id of the viz that this viz was forked from.
  // null only for the singular primordial viz.
  forkedFrom?: VizId;

  // When this viz was created.
  createdTimestamp: Timestamp;

  // When this viz was last updated.
  lastUpdatedTimestamp: Timestamp;
}

// A file within a viz.
export interface VizFile {
  // The file name.
  // e.g. "index.html".
  name: string;

  // The text content of the file.
  // e.g. "<body>Hello</body>"
  text: string;
}

// A collection of files in a viz.
export interface VizFiles {
  [vizFileId: VizFileId]: VizFile;
}

// The content of a viz.
export interface VizContent {
  id: VizId;
  files: VizFiles;
}

export interface GoogleProfileName {
  familyName: string;
  givenName: string;
}

export interface GoogleProfileEmail {
  value: string;
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  name: GoogleProfileName;
  emails: Array<GoogleProfileEmail>;
}

export interface Profiles {
  googleProfile?: GoogleProfile;
  //githubProfile?: GitHubProfile;
}

export interface User {
  // The unique ID of this user.
  id: UserId;

  // This user's unique user name.
  // Derived from GitHub user name if authenticated via GitHub.
  userName: string;

  // This user's full name (first name, last name).
  fullName: string;

  // The email address of this user.
  // This email is used as the "source of truth" for identity.
  email: string;

  profiles: Profiles;
}

// TODO migrate elements from the following VizHub v2 implementation:
//
//export class User {
//  constructor(data) {
//
//    this.id = data.id;
//
//    // This user's unique camelCase user name.
//    this.userName = data.userName;
//
//    // This user's full name (first name, last name).
//    this.fullName = data.fullName;
//
//    // The email address of this user.
//    this.email = data.email;
//
//    // The URL for loading this user's avatar image.
//    this.avatarUrl = data.avatarUrl;
//
//    // The company that this user works for (if provided).
//    this.company = data.company;
//
//    // The URL of the website or blog associated with this user (if provided).
//    this.website = data.website;
//
//    // The physical location of this user (if provided).
//    this.location = data.location;
//
//    // Biography.
//    this.bio = data.bio;
//
//    // The plan that the user is on.
//    // Possibly undefined (free plan) or "pro" (pro plan).
//    this.plan = data.plan;
//
//    // After a user upgrades to "pro" plan,
//    // this is the Stripd customer ID.
//    // Use: lookup the customer later when changing plans.
//    this.stripeCustomerId = data.stripeCustomerId;
//  }
//}

// A representation of when a user upvoted a viz.
export interface Upvote {
  userId: UserId;
  vizId: VizId;
  timestamp: Timestamp;
}

// A Markdown string.
export type Markdown = string;

// A comment on a viz.
export interface Comment {
  userId: UserId;
  vizId: VizId;
  timestamp: Timestamp;
  markdown: Markdown;
}

// Errors generated throughout VizHub should
// be of this type.
export class VizHubError extends Error {
  code: VizHubErrorCode;
  constructor(message, code) {
    super(message);
    this.name = 'VizHubError';
    this.code = code;
  }
}

// A VizHub-specific error code.
export type VizHubErrorCode = string;

// An OT Operation
// This type is complex, and is defined in detail here:
// https://github.com/ottypes/json1/blob/master/spec.md#operations
export type Op = any;

// A ShareDB Snapshot. See:
// https://share.github.io/sharedb/api/snapshot
export interface Snapshot<Type> {
  type: string;
  data: Type;
  v: number;
}
