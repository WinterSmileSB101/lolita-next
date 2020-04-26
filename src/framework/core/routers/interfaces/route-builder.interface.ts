export interface IRouteBuilder {
  setPath(path: string): IRouteBuilder;
  setBaseUrl(url: string): IRouteBuilder;
  setProtocol(protocol: 'http' | 'https'): IRouteBuilder;
  build(
    params?: { [key: string]: string | number | boolean },
    options?: { hash?: string; encode?: boolean },
  ): string;
}
