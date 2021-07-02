import assert from 'assert';
import fs from 'fs';
import { renderPage } from './index';
import { homePagePresenter } from '../../presenters/homePagePresenter';

const fileName = 'src/server/renderPage/renderPageTestExpected.html';
const updateExpectedHTML = (renderedHTML) => {
  fs.writeFileSync(fileName, renderedHTML);
  console.log('Updated expected HTML for renderPageTest:');
  console.log(renderedHTML);
};
const getExpectedHTML = () => fs.readFileSync(fileName, 'utf8');

export const renderPageTest = () => {
  describe('renderPage', () => {
    it('Should render home page with tricky unicode characters.', () => {
      const renderedHTML = renderPage({
        title: 'Test',
        page: 'TestPage',
        // This test is for the ’ unicode character.
        pageProps: { message: 'It’s a beautiful day!' },
      });

      // Uncomment this to update expected value,
      // e.g. if index.html was changed.
      // updateExpectedHTML(renderedHTML);

      assert.equal(renderedHTML, getExpectedHTML());
    });
  });
};
