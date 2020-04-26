import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";

import { AxiosRequestConfig, Method, ResponseType } from "axios";

export class RequestConfig implements AxiosRequestConfig {
  public method: Method;
  public url: string;
  public baseUrl: string;
  public adapter;

  public transformResponse: Array<(data, header) => any>;

  public transfromRequest: Array<(data, header) => any>;

  public headers: object = {};

  public params: object;

  public paramsSerializer: (param: string) => string;

  public data: object | string;

  public timeout: number;

  public maxContentLength: number;
  public withCredentials: boolean;
  public responseType: ResponseType = "json";
  public contentType: string;

  public responseEncoding: string = "utf8";

  public xsrfCookieName: string = "XSRF-TOKEN";

  public xsrfHeaderName: string = "X-XSRF-TOKEN";

  public onUploadProgress: (progressEvent) => void;
  public onDownloadProgress: (progressEvent) => void;

  public validateStatus: (status) => boolean;

  public maxRedirects: number = 5;

  public httpAgent: HttpAgent;
  public httpsAgent: HttpsAgent;

  public proxy: IProxy;

  public cancelToken;

  constructor(method: Method, url: string) {
    this.method = method;
    this.url = url;
  }
}

interface IProxy {
  host: string;
  port: number;
  auth: any;
}
