import { Observable } from "rxjs";
import { BaseControllerResult } from "@lolita/server-side/types/render";
import { Options } from "@lolita/server-side/types/render";

export interface IRender {
  render<T, O>(
    controllerResult: Observable<BaseControllerResult<T>>,
    options: Options
  ): (element: O) => Observable<Buffer>;
}
