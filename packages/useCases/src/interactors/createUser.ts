import { User } from 'datavis-tech-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { UserGateway } from '../gatewayInterfaces/userGateway'

export interface CreateUserRequestModel extends RequestModel {
  oAuthProfile: any
}

export interface CreateUserResponseModel extends ResponseModel {
  user: User
}

export class CreateUser implements Interactor {
  userGateway: UserGateway;

  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel: CreateUserRequestModel) {
    const {
      oAuthProfile: {
        id,
        username,
        _json: {
          name,
          avatar_url,
          company,
          blog,
          location,
          email,
          bio
        }
      }
    } = requestModel;

    const user = new User({
      id,
      userName: username,
      fullName: name,
      email,
      avatarUrl: avatar_url,
      company,
      website: blog,
      location,
      bio
    });

    return {
      user: await this.userGateway.createUser(user)
    }
  }
}
