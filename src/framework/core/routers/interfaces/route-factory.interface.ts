import { IRouteBuilder } from './route-builder.interface';

export interface IRouteFactory {
  create(PageAlias: any): IRouteBuilder;
}
