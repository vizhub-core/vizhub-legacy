import { DocumentPart } from './documentPart';
import { UserId } from './user';

export class DocumentInfo extends DocumentPart {

  // The ID of the user that owns this document.
  owner: UserId;

  // The title of the document.
  title: string;

  // The URL slug for the document.
  slug: string | undefined;

  // The Markdown description of the document.
  description: string;

  // The Unix timestamp at which this document was created.
  createdTimestamp: number;

  // The Unix timestamp at which this document was last updated.
  lastUpdatedTimestamp: number;

  constructor(data) {
    super({
      id: data.id,
      documentType: data.documentType
    });
    this.owner = data.owner;
    this.title = data.title;
    this.slug = data.slug;
    this.description = data.description;
    this.createdTimestamp = data.createdTimestamp;
    this.lastUpdatedTimestamp = data.lastUpdatedTimestamp;
  }
}
