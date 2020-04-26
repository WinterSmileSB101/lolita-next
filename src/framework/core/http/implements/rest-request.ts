import { IRestAPIRequest } from "../interfaces";
import { Method } from "axios";
import { DataFormat, ParameterType } from "../enum";
import { JsonParameter, Parameter } from "./parameter";

export class RestAPIRequest implements IRestAPIRequest {
  public parameters: Array<Parameter> = [];
  public method: Method = "GET";
  public requestFormat: DataFormat = DataFormat.JSON;
  public readonly resource: string;
  public timeout = 30000;
  public jsonp?: boolean;
  public raw?: boolean;

  public useDefaultCredentials = false;
  public useMutipartFormData = false;
  public useKeepAlive = false;

  public files: { name: string; path: string }[] = [];
  public headers: { [key: string]: string } = {};

  public xmlNamespace = "";

  constructor(resource: string) {
    this.resource = resource;
  }
  /*
  addParameter(name: Parameter): IRestAPIRequest;
  addParameter(name: string | Parameter, value: any): IRestAPIRequest;
  addParameter(name: string | Parameter, value: any, type: ParameterType): IRestAPIRequest;
  addParameter(name: any, value?: any, type?: any) {
    throw new Error("Method not implemented.");
  }
  
  addOrUpdateParameter(name: Parameter): IRestAPIRequest;
  addOrUpdateParameter(name: string | Parameter, value: any): IRestAPIRequest;
  addOrUpdateParameter(name: string | Parameter, value: any, type: ParameterType): IRestAPIRequest;
  addOrUpdateParameter(name: any, value?: any, type?: any) {
    throw new Error("Method not implemented.");
  }*/

  addJsonBody(obj: any): IRestAPIRequest {
    this.requestFormat = DataFormat.JSON;
    //this.addParameter(new JsonParameter(obj));
    return null;
  }
  addXmlBody(obj: any, xmlNamespace: string): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }
  addBody(obj: any, filePath?: string): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }
  addFile(fileName: string, filePath: string): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }
  addHeader(key: string, value: string): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }
  addObject(obj: any): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }
  addQueryParameter(
    name: string,
    value: string | number | boolean,
    encode?: boolean
  ): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }
  addUrlSegment(
    name: string,
    value: string | number | boolean
  ): IRestAPIRequest {
    throw new Error("Method not implemented.");
  }

}
