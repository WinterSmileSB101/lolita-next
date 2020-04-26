import { renderToString, renderToNodeStream } from 'react-dom/server';
import { ComponentType, createElement } from 'react';
import {
  PreRender,
  BaseControllerResult,
  PageInfoConfig,
  Options,
  RenderString,
  ControllerResult,
} from '@lolita/server-side/types/render';
import { SSRException } from '@lolita/server-side/exceptions';
import { getHtmlComponent } from './html';
import { Observable, of, throwError } from 'rxjs';
import { ContextType } from '@lolita/server-side/context/types';
import { skipNull } from '@lolita/server-side/utils/operator';
import { switchMap } from 'rxjs/operators';

export const renderHtmlToString = (
  element: ComponentType,
  preRender: PreRender,
  enviroment: ContextType,
) =>
  new Observable<Buffer>(subscriber => {
    const html = getHtmlComponent(element, preRender, enviroment);
    const stream = renderToNodeStream(createElement(html));

    let buf = Buffer.from('<!DOCTYPE html>');

    stream.on('data', data => {
      console.log('better')
      buf = Buffer.concat([buf, data]);
    });

    stream.on('end', () => {
      console.log('end')
      subscriber.next(buf);
      subscriber.complete();
    });

    stream.on('error', error => {
      console.log('error')
      subscriber.error(new SSRException(error));
    });
  });

/*
const reactString: RenderString<ComponentType, any> = ({ request, reply }) => {
  //cookit
  return element => preRender => {
    renderHtmlToString(element, preRender, {
      fastifyRequest: request,
      fastifyReply: reply,
      initialState: preRender?.controllerResult?.initialState,
    });
  };
};
*/
/*
export const render = <T, ComponentType>(
  controllerResult: Observable<BaseControllerResult<T>>,
  options: Options,
) => (element: ComponentType): Observable<Buffer> => of(null).pipe();
*/

const reactString: RenderString = ({ request, reply }) => {
  return element => preRender =>
    renderHtmlToString(element, preRender, {
      fastifyRequest: request,
      fastifyReply: reply,
      initialState: preRender?.controllerResult?.initialState,
    });
};



export const render = (
  controllerResult: Observable<ControllerResult>,
  options: Options,
) => (element: ComponentType): Observable<Buffer> =>of(null).pipe(skipNull(reactString(options)(element)),switchMap(_=>_));
  
