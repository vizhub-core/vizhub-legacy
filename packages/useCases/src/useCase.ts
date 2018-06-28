// Also called the "Request Model".
export interface Request {};

// Also called the "Response Model".
export interface Response {};

// Also called "Interactor" in Uncle Bob's architecture diagrams.
export interface UseCase {
  execute(Request): Response;
}
