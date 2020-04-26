import { ContextType } from '@lolita/server-side/context/types';
import React,{ ComponentType, Component } from 'react';
import { EnvironmentContext } from '@lolita/core/context/enviroment';

export function Context(environment: ContextType) {
  return function<T>(wrapped: T) {
    const Wrapped = (wrapped as any) as ComponentType;

    class ContextWrapped extends Component {
      render() {
        return (
          <EnvironmentContext.Provider value={environment}>
            <Wrapped {...this.props} />
          </EnvironmentContext.Provider>
        );
      }
    }

    return (ContextWrapped as any) as T;
  };
}
