import { ciUser } from 'vizhub-entities';

export class GetUserByEmail {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const { email } = requestModel;
    const responseModel = {
      user:
        email === ciUser.email
          ? ciUser
          : await this.userGateway.getUserByEmail(email),
    };
    return responseModel;
  }
}
