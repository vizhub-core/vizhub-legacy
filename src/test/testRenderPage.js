import assert from 'assert';
import { renderPage } from '../server/renderPage';
import { homePagePresenter } from '../presenters/homePagePresenter';

export const testRenderPage = () => {
  describe('renderPage', () => {
    it('Should render home page with tricky characters.', () => {
      const vizInfos = [
        {
          id: 'b6066101bd3a4f22a829c914fe01ac87',
          owner: '13540669',
          title:
            'Fork of       Episode 3: Sol LeWitt in Vanilla JavaScript version 2',
          description:
            "Inspiration from [Curran's live streaming](https://www.youtube.com/watch?v=_BLn9glthVk)\n\nStarted from scratch. Lot of research helps. \n\nExercise options:\n\nReproduce any Sol LeWitt piece.\n\nCreate generative art in the spirit of Sol LeWitt.\n\nAdd animation to what we’ve created (e.g. rotation).",
          createdTimestamp: 1616530197,
          lastUpdatedTimestamp: 1616530223,
          forkedFrom: 'a677d7bd926b41f59b240e11e7ba4b5a',
          forksCount: 3,
          height: 500,
          imagesUpdatedTimestamp: 1616530244,
          upvotes: [{ userId: '68416', timestamp: 1616706312 }],
          privacy: 'public',
        },
      ];
      const renderedHTML = renderPage(homePagePresenter({ vizInfos }));
      console.log(renderedHTML);
      assert.equal(renderedHTML, '');
    });
  });
};
