export class DatabaseUserGateway {
  constructor(database) {
    this.database = database;
  }

  async createUser(user) {
    return await this.database.createUser(user);
  }

  async saveUser(user) {
    return await this.database.saveUser(user);
  }

  async getUser(id) {
    return await this.database.getUser(id);
  }

  async getUsers(ids) {
    return await this.database.getUsers(ids);
  }

  async getUserByUserName(userName) {
    return await this.database.getUserByUserName(userName);
  }

  async getUserByEmail(email) {
    return await this.database.getUserByEmail(email);
  }

  async searchUsers(options) {
    return await this.database.searchUsers(options);
  }
}
