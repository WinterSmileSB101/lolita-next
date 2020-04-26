export class HttpCookie {
  public comment: string;
  public commentUri: URL;
  public discard: boolean;
  public domain: string;
  public expired: boolean;
  public expires: Date;
  public httpOnly: boolean;
  public name: string;
  public path: string;
  public port: string;
  public secure: boolean;
  public timeStamp: Date;
  public value: string;
  public version: number;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
