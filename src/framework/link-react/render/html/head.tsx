/* eslint-disable prefer-const */
import React, { FC } from 'react';
import { PreRender } from '@lolita/server-side/types/render';

const createHead = function<T>(preRender: PreRender) {
  const { headScripts = [], headStyles = [] } = preRender?.htmlConfig || {};
  const { PageTitle = null, PageDescription = null, PageKeywords = null } =
    preRender?.controllerResult?.pageInfo ||
    preRender?.siteConfig?.pageInfo ||
    {}; //from controller
  const { cookies=[] } = preRender?.siteConfig||{};

  const enableRobots = true;

  return (
    <head>
      <title>{PageTitle}</title>
      <meta charSet="utf-8" />
      <meta name="keywords" content={PageKeywords} />
      <meta name="description" content={PageDescription} />
      <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
      <meta
        name="robots"
        content={
          enableRobots
            ? 'index,follow,max-image-preview:large,max-snippet:-1'
            : 'noindex'
        }
      />
      {headScripts.map(hs => {
        return <script src={hs.src} key={hs.src}></script>;
      })}
      {headStyles.map(hs => {
        return <link href={hs.src} rel="stylesheet" key={hs.src} />;
      })}
      {
        <script
          id="disgusting"
          dangerouslySetInnerHTML={{
            __html: cookies.map(c => `document.cookie="${c}"`).join(';\n'),
          }}
        ></script>
      }
    </head>
  );
};

export { createHead };
