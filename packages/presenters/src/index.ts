import { CreateVisualizationResponseModel } from 'datavis-tech-use-cases';
import { DocumentId } from 'datavis-tech-entities';

export interface CVViewModel {
  id: DocumentId
}

export function CVPresenter(response: CreateVisualizationResponseModel) : CVViewModel {
  return { id: response.id };
}
