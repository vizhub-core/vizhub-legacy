import { User, UserId } from 'datavis-tech-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { UserGateway } from '../gatewayInterfaces/userGateway'

export interface GetUserRequestModel extends RequestModel {
  id: UserId,
}

export interface GetUserResponseModel extends ResponseModel {
  user: User
}

export class GetUser implements Interactor {
  userGateway: UserGateway;

  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel: GetUserRequestModel) {
    return {
      user: await this.userGateway.getUser(requestModel.id)
    };
  }
}
