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
        _json: { name, avatar_url, company, blog, location, email, bio },
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
