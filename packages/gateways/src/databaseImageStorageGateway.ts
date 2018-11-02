import { ImageStorageGateway } from 'datavis-tech-use-cases';

import { Images, DocumentId } from 'datavis-tech-entities';

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
}
