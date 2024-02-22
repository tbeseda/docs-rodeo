import arc from '@architect/functions'
import { Arcdown } from 'arcdown'

const renderer = new Arcdown()
const ghRoot = 'https://raw.githubusercontent.com/mdn/content/main/files/'

async function http({ params }) {
  const { locale, proxy } = params
  const mdnUrl = `https://developer.mozilla.org/${locale}/docs/${proxy}`
  const lang = locale.toLowerCase()
  const path = proxy.toLowerCase()

  let file
  try {
    const ghPath = [ghRoot, lang, path, 'index.md'].join('/')
    const response = await fetch(ghPath)
    file = await response.text()
  } catch (err) {
    return {
      status: 404,
      html: /* html */ `
        <a href="${mdnUrl}">Sorry, check MDN: ${mdnUrl}</a>
      `,
    }
  }

  // transform markdown file
  // ? these could be markdown-it plugins
  // fix up code fences
  file = file.replace(/```js[^\n]*\n/g, "```javascript\n")
  file = file.replace(/```plain\n/g, '```\n')
  // image paths
  file = file.replace(/!\[(.*?)\]\((.*?)\)/g, (match, altText, imagePath) => {
    return `![${altText}](${mdnUrl}/${imagePath})`;
  })

  const { html, title, tocHtml } = await renderer.render(file)

  const document = /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>docs.rodeo - ${title}</title>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <link rel="stylesheet" href="https://unpkg.com/highlight.js@11.5.1/styles/night-owl.css">
    <style>
      body {
        margin: 0;
        padding: 1rem 3rem;
        font-size: 18px;
        font-family: system-ui;
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        gap: 0.33rem;
        grid-auto-flow: row;
        grid-template-areas:
          "header  header  header"
          "left     doc     right"
          "footer  footer  footer";
      }
      header { grid-area: header; }
      left-rail { grid-area: left; }
      article { grid-area: doc; }
      right-rail { grid-area: right; }
      footer { grid-area: footer; }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.66rem 0;
        border-bottom: 1px solid #ddd;
      }
      header-title {
        & * {
          margin: 0;
        }
        h1 {
          a {
            color: royalblue;
            text-decoration-color: skyblue;
            text-decoration-thickness: .2rem;
            text-underline-offset: 1.5px;
          }
          a:visited {
            color: royalblue;
          }
        }
        h2 {
          color: cadetblue;
          font-size: 1.1rem;
        }
      }

      article {
        line-height: 1.33;
        a {
          color: royalblue;
          font-weight: 600;
          text-decoration: none;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      }

      footer {
        padding: 0.66rem 0;
        text-align: center;
      }

      .hljs {
        padding: 1rem;
      }
    </style>
  </head>
  <body>
    <header>
      <header-title>
        <h1><a href="/">docs.rodeo</a></h1>
        <h2>MDN Web Docs mirror</h2>
      </header-title>
      <nav>
        <a href="/en-US/docs/Web/HTML">HTML</a>
        <a href="/en-US/docs/Web/CSS">CSS</a>
        <a href="/en-US/docs/Web/JavaScript">JavaScript</a>
        <a href="/en-US/docs/Web/HTTP">HTTP</a>
        <!--<a href="/en-US/docs/Web/API">Web APIs</a>-->
        <a href="/en-US/docs/Web/Accessibility">Accessibility</a>
        <a href="/en-US/docs/Web/Security">Security</a>
        <a href="/en-US/docs/Web/Performance">Performance</a>
      </nav>
    </header>

    <left-rail>
    </left-rail>

    <article>
      <h1>${title}</h1>
      ${html}
    </article>

    <right-rail>
      <h3>In this article</h3>
      ${tocHtml}
      <code><a href="${mdnUrl}" target="_blank">View on MDN</a></code>
    </right-rail>

    <footer>
      <p>Content from <a href="https://github.com/mdn/content" target="_blank">MDN Web Docs</a></p>
    </footer>
  </body>
</html>
    `.trim()

  return {
    html: document,
    headers: {
      'cache-control': 'public, max-age=3600, must-revalidate',
    },
  }
}

export const handler = arc.http(http)
