import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

interface TemplateOptions {
  [key: string]: any;
  head?: JSX.Element[];
  title: string;
  body?: JSX.Element[];
}

export function Template(props: TemplateOptions) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="index,follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <link rel="icon" type="image/x-icon" href="//www.webmanajemen.com/favicon.ico" />
          {/* <meta name="language" content="English" /> */}
          <title>{props.title}</title>
          {props.head}
        </head>

        <body>
          <div id="root"></div>
          <div id="app"></div>
          {props.body}
        </body>
      </html>
    </>
  );
}

// https://www.saltycrane.com/blog/2020/05/how-generate-static-html-using-react-typescript-and-nodejs/
export async function renderStatic(props: TemplateOptions, outputFile: string) {
  if (!fs.existsSync(path.dirname(outputFile))) {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  }

  const html = ReactDOMServer.renderToStaticMarkup(<Template {...props} />);
  const htmlWDoc = '<!DOCTYPE html>' + html;
  const prettyHtml = await (await import('prettier')).format(htmlWDoc, { parser: 'html' });

  fs.writeFileSync(outputFile, prettyHtml);
  console.log(`Wrote ${outputFile}`);
}
