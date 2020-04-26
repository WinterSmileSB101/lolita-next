import { FastifyReply, FastifyRequest } from 'fastify';
import { BizConfig, UIConfig } from '@lolita/core/types/render';
import { SSRException } from '../../exceptions';
import { Observable } from 'rxjs';
import { ComponentType } from 'react';

export interface ControllerMethod<T> extends Function {
  __Root_Element__: T;
}

export interface PageInfoConfig {
  PageTitle?: string;
  PageDescription?: string;
  PageKeywords?: string;
  [key: string]: string;
}

export type HtmlConfig = {
  title?: string;
  robots: boolean;
  headScripts?: {
    src: string;
  }[];
  headStyles?: {
    src: string;
  }[];
  bodyScripts?: {
    src: string;
  }[];
};

export interface BaseControllerResult<T=any> {
  initialState: T;
  pageInfo?: PageInfoConfig;
}

export type PreRender = {
  htmlConfig?: HtmlConfig;
  controllerResult?: BaseControllerResult;
  siteConfig?: {
    commonConfig?: {
      CDN: string;
      ImageConfiguration: { [key: string]: any };
    };
    pageInfo?: PageInfoConfig;
    cookies?: string[];
  };
};

export interface ControllerResult extends BaseControllerResult {
  defaultPageSeo?: PageInfoConfig;
  ampPath?: string;
  canonicalPath?: string;
}

export type GetConfig = {
  [n: string]: any;
  (n: 'Biz'): BizConfig;
  (n?: 'App.UI'): UIConfig;
};

type Reply = FastifyReply<any>;

export type Options = {
  request: FastifyRequest;
  reply: Reply;
  getConfig: GetConfig;
  routeName: string;
  ampRouterFactory?: any;
  routerFactory: any;
};

/**
 * Data flow:
 * countroller data:controllerResult
 * add header:[controllerResult,CountryConfig]
 * add assets mainfest:Omit<PreRender,'cookies'>
 * config:Omit<PreRender,'cookies'>
 * cookies: PreRender
 * render to string
 */

export type AddHtmlHeader = {
  (x: {
    request: FastifyRequest;
    routeName: string;
    getConfig: GetConfig;
    ampRouterFactory?: any;
    routerFactory: any;
  }): ([data, country]: [ControllerResult, BizConfig]) => [
    ControllerResult,
    BizConfig,
  ];
};

export type AddAssetsManifest = {
  (x: { request: FastifyRequest; routeName: string; getConfig: GetConfig }): ([
    data,
    country,
  ]: [ControllerResult, BizConfig?]) => Omit<PreRender, 'cookies'>;
};

export type AddSiteConf<T> = {
  (x: { getConfig: GetConfig; routeName: string }): (
    data: Omit<PreRender, 'cookies'>,
  ) => Omit<PreRender, 'cookies'>;
};

export type RenderString = {
  (x: { request: FastifyRequest; reply: Reply }): (
    element: ComponentType
  ) => (preRender: PreRender) => Observable<Buffer>;
};
