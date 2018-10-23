import { DocumentId, } from 'datavis-tech-entities';
import { Visualization, Images } from 'datavis-tech-entities';

export interface ImageStorageGateway {
  updateImages({ id: DocumentId, images: Images}): Promise<any>;
}
