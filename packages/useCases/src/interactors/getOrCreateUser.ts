import { User, UserId, ciUser } from 'datavis-tech-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { UserGateway } from '../gatewayInterfaces/userGateway'
import { CreateUser } from './createUser'
import { GetUser } from './getUser'

export interface GetOrCreateUserRequestModel extends RequestModel {
  oAuthProfile: any
}

export interface GetOrCreateUserResponseModel extends ResponseModel {
  user: User
}

export class GetOrCreateUser implements Interactor {
  getUser: GetUser;
  createUser: CreateUser;

  constructor({ userGateway }) {
    this.getUser = new GetUser({ userGateway });
    this.createUser = new CreateUser({userGateway});
  }

  async execute(requestModel: GetOrCreateUserRequestModel) {
    const oAuthProfile = requestModel.oAuthProfile;
    try {
      return await this.getUser.execute(oAuthProfile.id);
    } catch (error) {
      const requestModel = { oAuthProfile };
      const responseModel = await this.createUser.execute(requestModel);
      return responseModel.user;
    }
  }
}
