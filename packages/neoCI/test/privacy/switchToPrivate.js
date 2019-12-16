import assert from 'assert';
import { navClick } from '../navClick';

export const switchToPrivate = my => async () => {
  // Open the privacy dialog.
  await navClick(my.page, '.test-toggle-editor');
  await my.page.waitFor('.test-editor');
  await (await my.page.waitFor('.test-editor-settings')).click();
  await (await my.page.waitFor('.test-privacy')).click();

  // Assert that the viz is public to begin with.
  const publicRadioButton = await my.page.waitFor(
    '.test-privacy-dialog-radio-public'
  );
  const publicRadioButtonIsActive = await my.page.evaluate(
    el => el.getAttribute('data-test-is-active'),
    publicRadioButton
  );
  assert.equal(publicRadioButtonIsActive, 'true');

  // Switch viz to private.
  const privateRadioButton = await my.page.waitFor(
    '.test-privacy-dialog-radio-public'
  );
  await privateRadioButton.click();

  // Assert that private radio button is now active.
  const privateRadioButtonIsActive = await my.page.evaluate(
    el => el.getAttribute('data-test-is-active'),
    privateRadioButton
  );
  assert.equal(privateRadioButtonIsActive, 'true');
};
