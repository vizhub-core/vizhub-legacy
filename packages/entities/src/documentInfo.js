export class DocumentInfo {
  constructor(data) {

    // The unique ID of this document.
    this.id = data.id;

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
