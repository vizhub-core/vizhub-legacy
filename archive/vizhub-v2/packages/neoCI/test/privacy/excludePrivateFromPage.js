import assert from 'assert';
import { getVizIdList } from './getVizIdList';

export const excludePrivateFromPage = (
  my,
  { url, parentSelector, expectPrivate = false }
) => async () => {
  const page = my.page;

  await page.goto(url);

  const parentHandle = await page.waitFor(parentSelector);
  const vizIdList = await getVizIdList(page, parentHandle);
  const privateVizIsShown = vizIdList.includes(my.privateVizId);

  assert.equal(privateVizIsShown, expectPrivate);
};
