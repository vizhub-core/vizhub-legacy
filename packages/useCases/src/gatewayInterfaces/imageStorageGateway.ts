import { DocumentId, } from 'datavis-tech-entities';
import { Images } from './imageGeneratorGateway';

export interface ImageStorageGateway {
  updateImages({ id: DocumentId, images: Images}): Promise<any>;
}
