export interface RequestModel {};

export interface ResponseModel {};

export interface Interactor {
  execute(RequestModel | undefined): Promise<ResponseModel | undefined>;
}
