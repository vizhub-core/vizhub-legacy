import { ciUser } from 'vizhub-entities';

export class GetUserByEmailOrId {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const { email, id } = requestModel;
    const responseModel = {
      user:
        email === ciUser.email || id === ciUser.id
          ? ciUser
          : await this.userGateway.getUserByEmailOrId(email, id),
    };
    return responseModel;
  }
}
