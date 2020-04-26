/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { ComponentType, Component, FC } from 'react';

import { WindowStateScript } from './window-state-script';
import {
  PageInfoConfig,
  BaseControllerResult,
  PreRender,
} from '@lolita/server-side/types/render';

type Props = {};
type State = {};

const createBody = function<T=any>(
  content: ComponentType,
  preRender: PreRender,
) {
  return class HtmlBody extends Component<Props, State> {
    render() {
      const { bodyScripts = [] } = preRender?.htmlConfig || {};
      const ContentComponent = content;

      return (
        <body>
          <WindowStateScript
            name="__initialState__"
            data={preRender?.controllerResult?.initialState}
          />
          <WindowStateScript
            name="__SITECONF__"
            data={preRender?.siteConfig?.commonConfig}
          />
          <WindowStateScript
            name="__PageConfig__"
            data={preRender?.siteConfig?.pageInfo}
          />
          <div id="app">
            <ContentComponent />
          </div>
          {bodyScripts.map(bs => {
            return <script src={bs.src} key={bs.src}></script>;
          })}
        </body>
      );
    }
  };
};

export { createBody };
