import { DocumentId, Images } from 'vizhub-entities';

export interface ImageStorageGateway {
  updateImages({ id: DocumentId, images: Images}): Promise<any>;
  getThumbnail({ id: DocumentId} ): Promise<string>;
  getPreview({ id: DocumentId} ): Promise<string>;
}
