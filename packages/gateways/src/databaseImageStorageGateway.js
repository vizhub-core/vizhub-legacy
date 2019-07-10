export class DatabaseImageStorageGateway {
  constructor(database) {
    this.database = database;
  }

  async updateImages(options) {
    return await this.database.updateImages(options);
  }

  async getThumbnail(options) {
    return await this.database.getThumbnail(options);
  }

  async getPreview(options) {
    return await this.database.getPreview(options);
  }
}
