import * as pathToRegexp from 'path-to-regexp';
import { memoize } from 'lodash';

export type toPathFunc = (params: any) => string;

const compiler = memoize((path: string): {
  toPath: toPathFunc;
  urlSegments: Array<string>;
} => {
  const toPath = pathToRegexp.compile(path);
  const urlSegments = [];

  pathToRegexp.pathToRegexp(path, urlSegments);

  return {
    toPath,
    urlSegments: urlSegments.map(a => a.name),
  };
});

const buildUrlSegment = (path, params) => {
  const _params = { ...params };
  const { toPath, urlSegments } = compiler(path);

  const segments = urlSegments.reduce((rcc, key) => {
    rcc[key] = _params[key];
    delete _params[key];
    return rcc;
  }, {});
};

export { buildUrlSegment, compiler };
