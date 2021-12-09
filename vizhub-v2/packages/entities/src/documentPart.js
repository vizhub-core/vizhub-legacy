export class DocumentPart {
  constructor(data) {
    // The unique ID of the document
    // that this document part is a part of.
    this.id = data.id;

    // The type of this document.
    // Either documentTypes.VISUALIZATION_TYPE or documentTypes.DATASET_TYPE
    this.documentType = data.documentType;
  }
}
