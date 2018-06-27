import { DocumentInfo } from './documentInfo';
import { DocumentId } from './documentId';

export class VisualizationInfo extends DocumentInfo {

  // The set of documents that this visualization references.
  references: DocumentId[];

  // The set of documents that reference into this visualization.
  referencedBy: DocumentId[];

  // The set of visualizations that are forks of this one.
  forks: DocumentId[];

  // The visualization that this visualization was forked from.
  // (optional).
  forkedFrom: DocumentId;

  // The thumbnail of this visualization.
  // 320 X 180 base 64 encoded PNG.
  thumbnail: string;

  constructor(data) {
    super({
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,
    });

    // The set of documents that this visualization references.
    // An array of document IDs.
    this.references = data.references;

    // The set of documents that reference into this visualization.
    // An array of document IDs.
    this.referencedBy = data.referencedBy;

    // The set of visualizations that are forks of this one.
    // An array of document IDs.
    this.forks = data.forks;

    // The visualization that this visualization was forked from.
    // A document ID (optional).
    this.forkedFrom = data.forkedFrom;

    // The thumbnail of this visualization.
    // 320 X 180 base 64 encoded PNG.
    this.thumbnail = data.thumbnail;
  }
}
