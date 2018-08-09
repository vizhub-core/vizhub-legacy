import { User, UserId } from 'datavis-tech-entities';

export interface UserGateway {
  createUser(user: User): Promise<User>;
  getUser(id: UserId): Promise<User>;

  //saveUser(request: SaveUserRequestModel):
  //  Promise<SaveUserResponseModel>;
}
