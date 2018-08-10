import { DocumentId } from './documentId';

export class DocumentPart {

  // The unique ID of the document
  // that this document part is a part of.
  id: DocumentId;

  // The type of this document.
  // Either documentTypes.VISUALIZATION_TYPE or documentTypes.DATASET_TYPE
  documentType: string;

  constructor(data) {
    this.id = data.id;
    this.documentType = data.documentType;
  }
}
