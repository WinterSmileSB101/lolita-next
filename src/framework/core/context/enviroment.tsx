import { take } from "./types";
import React, { useContext, createContext } from "react";
import { ContextType } from "@lolita/server-side/context/types";

export const EnvironmentContext = createContext<ContextType>(undefined);

let take: take = (map) => (f) => (
  <EnvironmentContext.Consumer>
    {(env: ContextType) => {
      return f(map(env));
    }}
  </EnvironmentContext.Consumer>
);

export const takeReply = take<ContextType["fastifyReply"]>(
  (env) => env.fastifyReply
);

export const takeRequest = take<ContextType["fastifyRequest"]>(
  (env) => env.fastifyRequest
);

export const useInitialState = <T,>(): T => useContext(EnvironmentContext)?.initialState;
