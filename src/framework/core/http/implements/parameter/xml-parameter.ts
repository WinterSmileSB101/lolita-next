import { Parameter } from ".";
import { ParameterType, DataFormat } from "../../enum";

export class XmlParameter extends Parameter {
  private readonly xmlNamespace;

  constructor(name: string, value: any, xmlNamespace: string) {
    super(name, value, ParameterType.QueryStringWithoutEncoding);

    this.xmlNamespace = xmlNamespace;
    this.dataFormat = DataFormat.XML;
    this.contentType = "xml";
  }

  public get XmlNamespace(): string {
    return this.XmlNamespace;
  }
}
