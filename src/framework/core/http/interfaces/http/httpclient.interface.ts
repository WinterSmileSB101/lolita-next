import { AxiosResponse, Method } from "axios";

export interface IHttpClient {
  send<T = any>(query?: object): Promise<AxiosResponse<T>>;
  addUrlSegment(name: string, value: string): IHttpClient;
  addHeader(name: string, value: string): IHttpClient;
  addBody(obj: any): IHttpClient;
  getAsRaw(): IHttpClient;
  method(method: Method): IHttpClient;
}
