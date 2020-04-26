export class HttpParameter {
  public name: string;
  public value: string;
  public contentType: string;

  constructor(name: string, value: string, contentType?: string) {
    this.name = name;
    this.value = value;

    this.contentType = contentType || undefined;
  }
}
