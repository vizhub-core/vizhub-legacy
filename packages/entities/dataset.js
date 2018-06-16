// This file represents the domain entity called Dataset.
export const dataset = data => ({

  // The title of the dataset.
  title: data.title,

  // The URL slug for the dataset.
  slug: data.slug,

  // The ID of the user that owns this dataset.
  owner: data.owner,

  // The Markdown description of the dataset.
  description: data.description,

  // The text content of this dataset.
  content: data.content,

  // The format of this dataset.
  // One of: 'csv', 'tsv', 'json', 'geojson', 'topojson'.
  format: data.format
});
