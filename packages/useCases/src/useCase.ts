// Also called "Interactor" in Uncle Bob's architecture diagrams.
export interface UseCase {
  execute(RequestModel): ResponseModel;
}
