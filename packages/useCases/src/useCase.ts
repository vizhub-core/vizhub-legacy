export interface Request {};

export interface Response {};

// Also called "Interactor" in Uncle Bob's architecture diagrams.
export interface UseCase {
  execute(Request): Promise<Response>;
}
