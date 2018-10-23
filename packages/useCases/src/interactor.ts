export interface RequestModel {};

export interface ResponseModel {};

export interface Interactor {
  execute(req: RequestModel | undefined): Promise<ResponseModel | undefined>;
}
