import { User } from 'vizhub-entities';
import { GetUser } from './getUser';

export class UpdateUser {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const {
      oAuthProfile: {
        id,
        username,
        email,
        avatar_url,
        _json: { name, company, blog, location, bio },
      },
    } = requestModel;

    const user = {
      id,
      userName: username,
      fullName: name,
      email,
      avatarUrl: avatar_url,
      company,
      website: blog,
      location,
      bio,
    };

    await this.userGateway.saveUser(user);
    return user;
  }
}
