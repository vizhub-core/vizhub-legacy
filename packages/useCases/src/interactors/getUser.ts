import { User, UserId, ciUser } from 'datavis-tech-entities';
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
    const { id } = requestModel;
    const responseModel: GetUserResponseModel = {
      user: (
        id === ciUser.id
          ? ciUser
          : await this.userGateway.getUser(id)
      )
    };
    return responseModel;
  }
}
