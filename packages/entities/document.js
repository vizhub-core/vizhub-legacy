// This file represents the domain entity called Document.
// Dataset and Visualization extend Document.
export const Document = data => ({

  // The unique ID of the document.
  id: data.id,

  // The title of the document.
  title: data.title,

  // The URL slug for the document.
  slug: data.slug,

  // The ID of the user that owns this document.
  owner: data.owner,

  // The Markdown description of the document.
  description: data.description

});
