import { AxiosResponse } from "axios";
import { Encoding } from "../enum/encoding.enum";
import { IRestAPIRequest } from ".";
import { Parameter } from "../implements/parameter";

export interface IRestAPIClient {
  baseUrl: string;
  baseHost: string;
  timeout: number;
  readWriteTimeout: number;
  encoding: Encoding;
  userAgent: string;
  followRedirect: boolean;
  connectionName: string;
  preAuth: Array<string>;
  defaultParameters: Array<Parameter>;
  proxy: any;
  excute<T>(request: IRestAPIRequest): Promise<AxiosResponse<T>>;
  buildUri(request: IRestAPIRequest): string;
}
