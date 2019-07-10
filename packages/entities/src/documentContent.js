import { DocumentPart } from './documentPart';

export class DocumentContent extends DocumentPart {
  constructor(data) {
    super({
      id: data.id,
      documentType: data.documentType
    });
  }
}
