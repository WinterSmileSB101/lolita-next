import { Parameter } from "./parameter";
import { DataFormat, ParameterType } from "../../enum";

export class JsonParameter extends Parameter {
  constructor(value: any) {
    super("application/json", value);

    this.dataFormat = DataFormat.JSON;
    this.type = ParameterType.RequestBody;
    this.contentType = "json";
  }
}
