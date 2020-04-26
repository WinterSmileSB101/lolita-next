import { ContextType } from "@lolita/server-side/context/types";
import { ComponentType } from "react";
import { hydrate } from "react-dom";
import { Context } from "@lolita/link-react/decorators/context/@context";
import React from "react";

const initialState = typeof window !=="undefined" &&(window as any)?.__initailState__;

const enviroment:ContextType={
    initialState
};

export function bootstrap(component:ComponentType){
    const Component = Context(enviroment)(component);

    hydrate(React.createElement(Component),document.getElementById("app"));
}