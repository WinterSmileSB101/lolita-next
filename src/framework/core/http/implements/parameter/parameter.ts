import { ParameterType, DataFormat } from "../../enum";

export class Parameter {
  public name: string;
  public value: any;
  public type: ParameterType;
  public dataFormat: DataFormat = DataFormat.NONE;
  public contentType: string;

  constructor(name?: string, value?: string, type?: ParameterType) {
    if ((!name && value) || (name && typeof value === "undefined")) {
      throw Error(
        `Parameter should both have [name] and [value],name:${name},value${value}`
      );
    } else if (!!name) {
      this.name = name;
      this.value = value;

      if (!!type) {
        this.type = type;
      }
    }
  }

  toString(): string {
    return `${this.name}=${this.value}`;
  }
}
