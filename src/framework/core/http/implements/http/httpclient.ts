import { IHttpClient } from "../../interfaces/http/httpclient.interface";
import { IRestAPIClient } from "../../interfaces/restapi-client.interface";
import { IRestAPIRequest } from "../../interfaces/restapi-request.interface";
import { AxiosResponse, Method } from "axios";

export class HttpClient implements IHttpClient {
  protected readonly _client: IRestAPIClient;
  protected readonly _request: IRestAPIRequest;

  private readonly options: { jsonp: boolean; callback?: string };

  constructor(client: IRestAPIClient, request: IRestAPIRequest) {
    this._client = client;
    this._request = request;
  }

  send<T = any>(query?: object): Promise<AxiosResponse<T>> {
    if (!!query) {
      Object.entries(query).forEach(([name, value]) => {
        this._request.addQueryParameter(name, <string>value);
      });
    }

    return this._client.excute<T>(this._request);
  }

  addUrlSegment(name: string, value: string): IHttpClient {
    this._request.addUrlSegment(name, value);

    return this;
  }

  addHeader(name: string, value: string): IHttpClient {
    this._request.addHeader(name, value);

    return this;
  }
  addBody(obj: any): IHttpClient {
    this._request.addBody(obj);

    return this;
  }
  getAsRaw(): IHttpClient {
    this._request.raw = true;

    return this;
  }
  method(method: Method): IHttpClient {
    this._request.method = method;

    return this;
  }
}
