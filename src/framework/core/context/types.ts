import { ContextType } from "@lolita/server-side/context/types";
import { ReactElement } from "react";

export type take = {
  <T>(map: (c: ContextType) => T): (f: (r: T) => ReactElement) => ReactElement;
};
