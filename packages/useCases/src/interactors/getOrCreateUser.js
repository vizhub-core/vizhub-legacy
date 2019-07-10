import { CreateUser } from './createUser';
import { GetUser } from './getUser';

export class GetOrCreateUser {
  constructor({ userGateway }) {
    this.getUser = new GetUser({ userGateway });
    this.createUser = new CreateUser({ userGateway });
  }

  async execute(requestModel) {
    const oAuthProfile = requestModel.oAuthProfile;
    const { user } = await this.getUser.execute(oAuthProfile.id);
    if (user) {
      return { user };
    } else {
      return await this.createUser.execute({ oAuthProfile });
    }
  }
}
