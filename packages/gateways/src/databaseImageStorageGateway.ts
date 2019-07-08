import { ImageStorageGateway } from 'vizhub-use-cases';

import { Images, DocumentId } from 'vizhub-entities';

export class DatabaseImageStorageGateway implements ImageStorageGateway {
  database: any;

  constructor(database) {
    this.database = database;
  }

  async updateImages(options){
    return await this.database.updateImages(options);
  }

  async getThumbnail(options){
    return await this.database.getThumbnail(options);
  }

  async getPreview(options){
    return await this.database.getPreview(options);
  }
}
