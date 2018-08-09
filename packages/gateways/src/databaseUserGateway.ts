import { UserGateway } from 'datavis-tech-use-cases';

import { User, UserId } from 'datavis-tech-entities';

export class DatabaseUserGateway implements UserGateway {
  database: any;

  constructor(database) {
    this.database = database;
  }

  async createUser(user: User): Promise<User> {
    return await this.database.createUser(user);
  }

  async getUser(id: UserId) {
    return await this.database.getUser(id);
  }

  //async saveUser({ user }) {
  //  return await this.database.saveUser({ user });
  //}
}
