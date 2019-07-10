import { DocumentPart } from './documentPart';

export class DocumentInfo extends DocumentPart {
  constructor(data) {
    super({
      id: data.id,
      documentType: data.documentType
    });

    // The ID of the user that owns this document.
    this.owner = data.owner;

    // The title of the document.
    this.title = data.title;

    // The URL slug for the document.
    this.slug = data.slug;

    // The Markdown description of the document.
    this.description = data.description;

    // The Unix timestamp at which this document was created.
    this.createdTimestamp = data.createdTimestamp;

    // The Unix timestamp at which this document was last updated.
    this.lastUpdatedTimestamp = data.lastUpdatedTimestamp;
  }
}
