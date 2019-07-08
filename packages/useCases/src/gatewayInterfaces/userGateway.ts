import { User, UserId } from 'vizhub-entities';

export interface UserGateway {
  createUser(user: User): Promise<User>;
  getUser(id: UserId): Promise<User>;
  getUserByUserName(userName: string): Promise<User>;

  //saveUser(request: SaveUserRequestModel):
  //  Promise<SaveUserResponseModel>;
}
