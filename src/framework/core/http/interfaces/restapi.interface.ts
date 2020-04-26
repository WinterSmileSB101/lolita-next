import { Credentials } from "../enum/credentials.enum";
import { Encoding } from "../enum/encoding.enum";
import { Method, AxiosResponse } from "axios";
import { HttpHeader, HttpParameter, HttpCookie } from "../implements/http";

export interface IRestAPI {
  credentials: Credentials;
  alwaysMutipartFormData: boolean;
  userAgent: string;
  timeout: number;
  followRedirects: boolean;
  maxRedirects: number;
  useDefaultCredentials: boolean;
  encoding: Encoding;

  requestContentType: string;
  requestBody: string;

  headers: Array<HttpHeader>;
  parameters: Array<HttpParameter>;
  cookis: Array<HttpCookie>;

  url: string;
  host: string;
  jsonp: string;
  raw: string;

  asGet<T>(responseCb, method: Method): Promise<AxiosResponse<T>>;
  asPost<T>(responseCb, method: Method): Promise<AxiosResponse<T>>;

  get<T>(method, responseCb): Promise<AxiosResponse<T>>;
  put<T>(method, responseCb): Promise<AxiosResponse<T>>;
  post<T>(method, responseCb): Promise<AxiosResponse<T>>;
  delete<T>(method, responseCb): Promise<AxiosResponse<T>>;
  head<T>(method, responseCb): Promise<AxiosResponse<T>>;
  options<T>(method, responseCb): Promise<AxiosResponse<T>>;
  patch<T>(method, responseCb): Promise<AxiosResponse<T>>;
}
