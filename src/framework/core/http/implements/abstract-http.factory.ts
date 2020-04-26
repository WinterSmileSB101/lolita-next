import { IRestAPIClient } from "../interfaces/restapi-client.interface";
import { IRestAPIRequest } from "../interfaces/restapi-request.interface";
import { HttpClient } from "./http";
import { IHttpClient } from "../interfaces";

export abstract class AbstractHttpFactory {
  abstract createRestClient(name: string): IRestAPIClient;

  abstract createRestRequest(name: string): IRestAPIRequest;

  create(apiName: string): IHttpClient {
    return new HttpClient(
      this.createRestClient(apiName),
      this.createRestRequest(apiName)
    );
  }
}
