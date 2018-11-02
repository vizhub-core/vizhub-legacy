import { DocumentId, Images } from 'datavis-tech-entities';

export interface ImageStorageGateway {
  updateImages({ id: DocumentId, images: Images}): Promise<any>;
}
