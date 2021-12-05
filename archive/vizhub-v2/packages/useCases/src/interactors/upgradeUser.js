import { User } from 'vizhub-entities';
import { GetUser } from './getUser';

export class UpgradeUser {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
    this.getUser = new GetUser({ userGateway });
  }

  async execute(requestModel) {
    const { id, stripeCustomerId } = requestModel;

    const { user } = await this.getUser.execute({ id });

    return await this.userGateway.saveUser({
      ...user,
      plan: 'pro',
      stripeCustomerId,
    });
  }
}
