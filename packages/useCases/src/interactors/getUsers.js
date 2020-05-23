import { ciUser } from 'vizhub-entities';

// Gets multiple users at a time.
//
// When there are many users to fetch, prefer to use this instead of GetUser,
// to minimize the number of API requests and database queries (less server load).
export class GetUsers {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const { ids } = requestModel;
    const responseModel = {
      users: await this.userGateway.getUsers(ids),
    };
    return responseModel;
  }
}
