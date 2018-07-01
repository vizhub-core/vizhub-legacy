import { DocumentId } from './documentId';

export class DocumentPart {

  // The unique ID of the document
  // that this document part is a part of.
  id: DocumentId;

  constructor(id) {
    this.id = id;
  }
}
