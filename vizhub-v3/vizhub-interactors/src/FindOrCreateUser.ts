// TODO define Profiles as an object with optional googleProfile or githubProfile properties.
import { User, Profiles } from 'vizhub-entities';
import { Gateways } from './Gateways';
import { generateRandomId } from './generateRandomId';
import { USER_NOT_FOUND } from './errorCodes';

// Gets the primary email address from profiles.
// TODO consider deeply the case of multiple emails for a single user.
//  * Use case: SSO from work email associated to same account as personal (like GitHub)
//  * Tentative plan:
//    * Get everything working with the assumption of a single email.
//    * Later, build out support for multiple emails.
//      * Concern: query performance?
//      * See https://docs.mongodb.com/manual/reference/operator/query/in/
//      * See https://docs.mongodb.com/manual/tutorial/query-arrays/
//      * First, query for primary email. Only if that fails, do the more expensive query:
//      * db.users.find( { emails: email } ) <------ THAT'S IT!

//  * See https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-user-account-settings/merging-multiple-user-accounts
//  * See https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/adding-an-email-address-to-your-github-account

// Allow automated tests to specific a non-random id generation function.
let generateId = generateRandomId;
export const setGenerateId = (newGenerateId) => {
  generateId = newGenerateId;
};

const getPrimaryEmailFromProfiles = (profiles: Profiles) =>
  profiles.googleProfile?.emails?.[0]?.value;

const getEmailsFromProfiles = (profiles: Profiles) =>
  profiles.googleProfile?.emails?.map((d) => d.value);

// Gets the userName from profiles.
//  * TODO If githubProfile exists, userName is taken from there.
//  * TODO If twitterProfile exists, userName is taken from there.
//  * If googleProfile exists, userName is generated as a random string.
//    * In this case, the user can choose a username later on.
//      * TODO let the user change their username later on.
const getUserNameFromProfiles = (profiles: Profiles) => generateId();

export const FindOrCreateUser = (gateways: Gateways) => {
  const { getUserSnapshotByEmails, saveUser } = gateways;
  return async (profiles: Profiles): Promise<void> => {
    // Attempt to find the user based on their email addresses.
    const emails = getEmailsFromProfiles(profiles);
    let user;
    try {
      user = await getUserSnapshotByEmails(emails);
    } catch (error) {
      // It is expected that if we're here, the user was not found.
      // Just in case something else went wrong, surface that error here.
      if (error.code !== USER_NOT_FOUND) {
        throw error;
      }

      // If no user was found by email, mint a brand new one.
      user = {
        id: generateId(),
        emails,
        primaryEmail: getPrimaryEmailFromProfiles(profiles),
        userName: getUserNameFromProfiles(profiles),
      };
    }

    // Whether new or old, update the latest upstream profile data.
    user.profiles = { ...user.profiles, ...profiles };

    await saveUser(user);

    return user;
  };
};
