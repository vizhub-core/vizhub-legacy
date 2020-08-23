import { User } from 'vizhub-entities';

export class CreateUser {
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

    const user = new User({
      id,
      userName: username,
      fullName: name,
      email,
      avatarUrl: avatar_url,
      company,
      website: blog,
      location,
      bio,
    });

    return {
      user: await this.userGateway.createUser(user),
    };
  }
}
