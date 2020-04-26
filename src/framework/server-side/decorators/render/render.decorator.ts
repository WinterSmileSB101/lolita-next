/* eslint-disable @typescript-eslint/camelcase */

import { ControllerMethod } from "@lolita/server-side/types/render";

export function RenderHtml<T = any>(element: T) {
  return function(target: any, propertyKey, descriptor: PropertyDescriptor) {
    (descriptor.value as ControllerMethod<T>).__Root_Element__ = element;
  };
}
