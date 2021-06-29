import assert from 'assert';
import { renderPage } from '../server/renderPage';
import { homePagePresenter } from '../presenters/homePagePresenter';

export const renderPageTest = () => {
  describe('renderPage', () => {
    it('Should render home page with tricky unicode characters.', () => {
      const renderedHTML = renderPage({
        title: 'Test',
        page: 'TestPage',
        // This test is for the ’ unicode character.
        pageProps: { message: 'It’s a beautiful day!' },
      });
      //console.log("`"+renderedHTML+"`")
      assert.equal(
        renderedHTML,
        `<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <meta name="viewport" content="width=device-width">
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body>
    <div id="root"><div data-reactroot="">Test: <!-- -->It’s a beautiful day!</div></div>
    <script src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3-require@1.2.4/dist/d3-require.min.js"></script>
    <script>
      window.pageData = "JTdCJTIycGFnZSUyMiUzQSUyMlRlc3RQYWdlJTIyJTJDJTIycGFnZVByb3BzJTIyJTNBJTdCJTIybWVzc2FnZSUyMiUzQSUyMkl0JUUyJTgwJTk5cyUyMGElMjBiZWF1dGlmdWwlMjBkYXkhJTIyJTdEJTdE";
    </script>
    <script src="/client.js"></script>
  </body>
</html>`
      );
    });
  });
};
