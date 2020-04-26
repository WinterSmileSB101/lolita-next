import React, { ComponentType, Component } from 'react';
import { createBody } from './body';
import { createHead } from './head';

import { Context } from '@lolita/link-react/decorators/context/@context';
import { ContextType } from '@lolita/server-side/context/types';
import { PreRender } from '@lolita/server-side/types/render';

type Props = {};
type State = {};

const createHtml = function<T=any>(
  content: ComponentType,
  preRender: PreRender,
  enviroment: ContextType,
) {
  const headConst = createHead<T>(preRender);
  const bodyConst = createBody<T>(content, preRender);

  @Context(enviroment)
  class Html extends Component<Props, State> {
    render() {
      return (
        <html lang="zh-cn">
          <p>test</p>
        </html>
      );
    }
  }

  return (Html as any) as ComponentType;
};

export { createHtml };
