// TODO define Profiles as an object with optional googleProfile or githubProfile properties.
import { User, Profiles } from 'vizhub-entities';
import { Gateways } from './Gateways';

export const FindOrCreateUser = (gateways: Gateways) => {
  const { getUserSnapshotByEmail, saveUser } = gateways;
  return async (email: string, profiles: Profiles): Promise<void> => {
    let user = await getUserSnapshotByEmail(email);

    if (!user) {
      // TODO generate random ID, generate full User entity.
      //user.id = uuid();
    }

    user.profiles = { ...user.profiles, ...profiles };

    await saveUser(user);
  };
};
