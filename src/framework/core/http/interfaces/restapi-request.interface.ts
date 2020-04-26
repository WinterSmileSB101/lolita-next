import { Method } from "axios";
import { DataFormat, ParameterType } from "../enum";
import { Parameter } from "../implements/parameter";

export interface IRestAPIRequest {
  parameters: Array<Parameter>;
  method: Method;
  requestFormat: DataFormat;
  resource: string;
  timeout: number;
  jsonp?: boolean;
  raw?: boolean;

  useDefaultCredentials: boolean;
  useMutipartFormData: boolean;
  useKeepAlive: boolean;

  files: Array<{ name: string; path: string }>;
  headers: { [key: string]: string };

  addJsonBody(obj: any): IRestAPIRequest;
  addXmlBody(obj: any, xmlNamespace: string): IRestAPIRequest;
  addBody(obj: any, filePath?: string): IRestAPIRequest;
  addFile(fileName: string, filePath: string): IRestAPIRequest;
  addHeader(key: string, value: string): IRestAPIRequest;
  addObject(obj: any): IRestAPIRequest;
  addQueryParameter(
    name: string,
    value: string | number | boolean,
    encode?: boolean
  ): IRestAPIRequest;
  addUrlSegment(
    name: string,
    value: string | number | boolean
  ): IRestAPIRequest;

  /*
  addParameter(name: Parameter): IRestAPIRequest;
  addParameter(name: string | Parameter, value: any): IRestAPIRequest;
  addParameter(
    name: string | Parameter,
    value: any,
    type: ParameterType
  ): IRestAPIRequest;

  addOrUpdateParameter(name: Parameter): IRestAPIRequest;
  addOrUpdateParameter(name: string | Parameter, value: any): IRestAPIRequest;
  addOrUpdateParameter(
    name: string | Parameter,
    value: any,
    type: ParameterType
  ): IRestAPIRequest;
  */
}
