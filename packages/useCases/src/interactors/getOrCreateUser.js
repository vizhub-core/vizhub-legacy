import { CreateUser } from './createUser';
import { GetUserByEmail } from './getUserByEmail';
import { GetUserByEmailOrId } from './getUserByEmailOrId';
import { UpdateUser } from './updateUser';

export class GetOrCreateUser {
  constructor({ userGateway }) {
    this.getUserByEmail = new GetUserByEmail({ userGateway });
    this.getUserByEmailOrId = new GetUserByEmailOrId({ userGateway });
    this.createUser = new CreateUser({ userGateway });
    this.updateUser = new UpdateUser({ userGateway });
  }

  async execute(requestModel) {
    const oAuthProfile = requestModel.oAuthProfile;
    const { user } = await this.getUserByEmailOrId.execute(
      oAuthProfile.email,
      oAuthProfile.id
    );
    if (user) {
      // call to update user on each login
      console.log('user (existing):');
      console.log(JSON.stringify(user, null, 2));
      const updatedUser = await this.updateUser.execute({ oAuthProfile, user });
      console.log('user (updated):');
      console.log(JSON.stringify(updatedUser, null, 2));
      return { user: updatedUser };
    } else {
      return await this.createUser.execute({ oAuthProfile });
    }
  }
}
