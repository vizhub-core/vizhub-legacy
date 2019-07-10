import { ciUser } from 'vizhub-entities';

export class GetUser {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const { id } = requestModel;
    const responseModel = {
      user: id === ciUser.id ? ciUser : await this.userGateway.getUser(id)
    };
    return responseModel;
  }
}
