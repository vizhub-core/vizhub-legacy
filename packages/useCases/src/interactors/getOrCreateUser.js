import { CreateUser } from './createUser';
import { GetUserByEmail } from './getUserByEmail';

export class GetOrCreateUser {
  constructor({ userGateway }) {
    this.getUserByEmail = new GetUserByEmail({ userGateway });
    this.createUser = new CreateUser({ userGateway });
  }

  async execute(requestModel) {
    const oAuthProfile = requestModel.oAuthProfile;
    const { user } = await this.getUserByEmail.execute({
      email: oAuthProfile.email,
    });
    if (user) {
      return { user };
    } else {
      return await this.createUser.execute({ oAuthProfile });
    }
  }
}
