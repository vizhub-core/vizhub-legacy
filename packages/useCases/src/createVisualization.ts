import { UseCase, Request, Response } from '../useCase';

// CV = CreateVisualization
export interface CVRequest extends Request;
export interface CVRequest extends Response;

export class CreateVisualization implements UseCase{
  execute(request: CVRequest): Promise<CVResponse> {

  }
}
