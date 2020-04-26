import { ComponentType } from 'react';
import { createHtml } from './html';
import { ContextType } from '@lolita/server-side/context/types';
import { PreRender } from '@lolita/server-side/types/render/render.types';

function getHtmlComponent(
  content: ComponentType,
  preRender: PreRender,
  enviroment: ContextType,
): ComponentType {
  const html = createHtml(content, preRender, enviroment);
  return html;
}

export { getHtmlComponent };
