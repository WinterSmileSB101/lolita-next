import { IRestAPI } from "../../interfaces/restapi.interface";
import { Credentials, Encoding } from "../../enum";
import { RequestConfig, HttpParameter, HttpCookie, HttpHeader } from ".";

const FORM_BOUNDARY = '-----------------------------------------28947758029299';

export class Http implements IRestAPI {
  private readonly restrictedHeaderActions: Map<string, Function> = new Map<
    string,
    Function
  >();

  public credentials: Credentials;
  public alwaysMutipartFormData: boolean;
  public userAgent: string;
  public timeout: number;
  public followRedirects: boolean;
  public maxRedirects: number;
  public useDefaultCredentials: boolean;
  public encoding: Encoding;
  public requestContentType: string;
  public requestBody: string;
  public url: string;
  public host: string;
  public jsonp: string;
  public raw: string;

  public headers: Array<HttpHeader>;
  public parameters: Array<HttpParameter>;
  public cookis: Array<HttpCookie>;

  public get hasCookie(): boolean {
    return this.cookis.length > 0;
  }
  public get hasBody(): boolean {
    return !!this.requestBody;
  }
  public get hasParameters(): boolean {
    return this.parameters.length > 0;
  }
  public get hasHeaders(): boolean {
    return this.headers.length > 0;
  }

  constructor() {}
    asGet<T>(responseCb: any, method: import("axios").Method): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    asPost<T>(responseCb: any, method: import("axios").Method): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    get<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    put<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    post<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    delete<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    head<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    options<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }
    patch<T>(method: any, responseCb: any): Promise<import("axios").AxiosResponse<T>> {
        throw new Error("Method not implemented.");
    }

  private addSharedHeaderActions(): void {
    this.restrictedHeaderActions.set("Accept", (r, v) => (r.accept = v));
    this.restrictedHeaderActions.set(
      "Content-Type",
      (r, v) => (r.contentType = v)
    );
    this.restrictedHeaderActions.set("Date", (r, v) => {
      try {
        r.Date = new Date(v);
      } catch {
        r.Date = new Date();
      }
    });
  }

  private addSyncHeaderActions(): void {}

  private appendHeaders(requestConfig: RequestConfig): void {
    this.headers.forEach((h) => {
      const invoke = this.restrictedHeaderActions.get(h.name);
      if (invoke) {
        invoke(requestConfig.headers, h.value);
      } else {
        requestConfig.headers[h.name] = h.value;
      }
    });
  }

  private appendCookies(requestConfig: RequestConfig): void {
    if (typeof document !== "undefined") {
      return;
    }

    requestConfig.headers["cookie"] = this.cookis
      .map((p) => `${p.name}=${p.value}`)
      .join(";");
  }

  private preparePostBody(requestConfig: RequestConfig): void {
    const needsContentType: boolean = !!requestConfig.contentType;

    const encodeParameters=()=>this.parameters.map(p=>`${encodeURI(p.name)}=${encodeURI(p.value)}`).join('&');

    if(this.alwaysMutipartFormData)
    {
        if(needsContentType){
            requestConfig.contentType = `multipart/form-data;boundary=${FORM_BOUNDARY}`;
        }
    }else if(this.hasBody){
        if(needsContentType){
            requestConfig.contentType = this.requestContentType;
        }
    }
    else if(this.hasParameters){
        if(needsContentType){
            requestConfig.contentType = 'application/x-www-form-urlencoded';
        }
        this.requestBody = encodeParameters();
    }
  }

  private writeRequestBody(requestConfig:RequestConfig){
      if(this.hasBody||this.alwaysMutipartFormData){
          if(this.alwaysMutipartFormData){

          }else if(requestConfig.contentType==='application/json'){
              requestConfig.data = JSON.stringify(this.requestBody);
          }
          else{
              requestConfig.data = this.requestBody;
          }
      }
  }

  private writeMultipartFormData():string{
      let result:string='';

      for(let param of this.parameters){
          result += this.getMultipartFormData(param);
      }

      return result;
  }

  private getMultipartFormData(param:HttpParameter):string{
      return param.name===this.requestContentType
      ?`--${FORM_BOUNDARY}\r\nContent-Type:${param.contentType}`
      :``;
  }
}
