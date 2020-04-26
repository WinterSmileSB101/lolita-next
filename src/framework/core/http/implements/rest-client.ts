import { IRestAPIClient } from "../interfaces";
import { Encoding } from "../enum";

export class RestAPIClient implements IRestAPIClient {
  baseUrl: string;
  baseHost: string;
  timeout: number;
  readWriteTimeout: number;
  encoding: Encoding = Encoding.UTF8;
  userAgent: string;
  followRedirect: boolean;
  connectionName: string;
  preAuth: string[];
  defaultParameters: any[];
  proxy: any;

  constructor(baseurl?: string) {
    this.baseUrl = baseurl;
  }

  excute<T>(
    request: import("../interfaces").IRestAPIRequest
  ): Promise<import("axios").AxiosResponse<T>> {
    throw new Error("Method not implemented.");
  }
  buildUri(request: import("../interfaces").IRestAPIRequest): string {
    throw new Error("Method not implemented.");
  }
}
