export class DatabaseUserGateway {
  constructor(database) {
    this.database = database;
  }

  async createUser(user) {
    return await this.database.createUser(user);
  }

  async getUser(id) {
    return await this.database.getUser(id);
  }

  async getUserByUserName(userName) {
    return await this.database.getUserByUserName(userName);
  }
}
