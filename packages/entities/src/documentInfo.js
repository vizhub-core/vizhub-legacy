import { DocumentPart } from './documentPart';

export class DocumentInfo extends DocumentPart {
  constructor(data) {
    super(data.id);

    // The ID of the user that owns this document.
    this.owner = data.owner;

    // The title of the document.
    this.title = data.title;

    // The URL slug for the document.
    this.slug = data.slug;

    // The Markdown description of the document.
    this.description = data.description;
  }
}
