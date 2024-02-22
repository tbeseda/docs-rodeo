// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: /*html*/ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>docs.rodeo</title>
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
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

        nav {
          display: flex;
          gap: 0.66rem;
          a {
            color: royalblue;
            text-decoration: none;
            font-weight: 600;
          }
        }
      }

      footer {
        padding: 0.66rem 0;
        text-align: center;
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
      <h1>A work in progress....</h1>
    </article>

    <right-rail>
    </right-rail>

    <footer>
      <p>Content from <a href="https://github.com/mdn/content" target="_blank">MDN Web Docs</a></p>
    </footer>
  </body>
</html>
`,
  }
}
