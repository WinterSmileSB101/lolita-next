import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  ControllerMethod,
  BaseControllerResult,
} from "@lolita/server-side/types/render";
import { ROUTE_NAME_METADATA } from "@lolita/core/reflect";
import { IRender } from "./interfaces";
import { IRouteFactory } from "@lolita/core/routers";
import { render } from "@lolita/link-react/render/render";
import { ComponentType } from "react";

@Injectable()
export class RenderHtmlInterceptor implements NestInterceptor {
  /*
  constructor(
    //private readonly render: IRender,
  ) {}*/

  private readonly routerFactory: IRouteFactory

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const element = (context.getHandler() as ControllerMethod<ComponentType>)
      .__Root_Element__;
    if (!element) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const reply = context.switchToHttp().getResponse();

    const getConfig = (name: string) => {
      //config
      return null; //return config here
    };

    const routeName = Reflect.getMetadata(
      ROUTE_NAME_METADATA,
      context.getHandler()
    );

    const options = {
      request,
      reply,
      getConfig,
      routeName,
      routerFactory: this.routerFactory,
    };

    reply.header("Content-Type", "text/html;charset=UTF-8");

    return render(
        next.handle(),
        options
      )(element)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }
}
