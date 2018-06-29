import { UseCase, Request, Response } from './useCase';

// CV = CreateVisualization
export interface CVRequest extends Request {
}

export interface CVResponse extends Response {
}

export class CreateVisualization implements UseCase{
  async execute(request: CVRequest): Promise<CVResponse> {
    return await Promise.resolve('foo');
  }
}
