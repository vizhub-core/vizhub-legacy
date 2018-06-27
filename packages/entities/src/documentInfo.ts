import { DocumentPart } from './documentPart';

export class DocumentInfo extends DocumentPart {

  // The ID of the user that owns this document.
  owner: string;

  // The title of the document.
  title: string;

  // The URL slug for the document.
  slug: string;

  // The Markdown description of the document.
  description: string;

  constructor(data) {
    super(data.id);
    this.owner = data.owner;
    this.title = data.title;
    this.slug = data.slug;
    this.description = data.description;
  }
}
