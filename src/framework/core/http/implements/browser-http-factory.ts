import { AbstractHttpFactory } from "./abstract-http.factory";
import { IRestAPIClient, IRestAPIRequest, IHttpClient } from "../interfaces";
import { RestAPIRequest } from "./rest-request";
import { RestAPIClient } from "./rest-client";

export class BrowserHttpFactory extends AbstractHttpFactory {
  private static _httpFactory = new BrowserHttpFactory();

  createRestClient(name: string): IRestAPIClient {
    return new RestAPIClient(`${location.protocol}//${location.host}`);
  }
  createRestRequest(name: string): IRestAPIRequest {
    return new RestAPIRequest(`api/${name}`);
  }

  public static initalize() {
    this._httpFactory = new BrowserHttpFactory();
  }

  public static create(apiName: string): IHttpClient {
    return this._httpFactory.create(apiName);
  }
}
