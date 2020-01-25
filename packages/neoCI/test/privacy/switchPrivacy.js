import assert from 'assert';
import { navClick } from '../navClick';

export const switchPrivacy = (
  my,
  fromPrivacyValue,
  toPrivacyValue
) => async () => {
  // Open the privacy dialog.
  await navClick(my.page, '.test-toggle-editor');
  await my.page.waitFor('.test-editor');
  await (await my.page.waitFor('.test-settings')).click();

  // Assert that the viz has the expected privacy state to start with
  const fromRadioButton = await my.page.waitFor(
    `.test-privacy-dialog-radio-${fromPrivacyValue}`
  );
  const fromRadioButtonIsActive = await my.page.evaluate(
    el => el.getAttribute('data-test-is-active'),
    fromRadioButton
  );
  assert.equal(fromRadioButtonIsActive, 'true');

  // Switch to desired privacy setting.
  const toRadioButton = await my.page.waitFor(
    `.test-privacy-dialog-radio-${toPrivacyValue}`
  );
  await toRadioButton.click();

  // Assert that private radio button is now active.
  const toRadioButtonIsActive = await my.page.evaluate(
    el => el.getAttribute('data-test-is-active'),
    toRadioButton
  );
  assert.equal(toRadioButtonIsActive, 'true');

  // Wait some time to ensure the change was passed to backend fia WebSocket.
  await new Promise(resolve => setTimeout(resolve, 300));

  // Close the modal.
  await (await my.page.waitFor('.test-privacy-dialog-close')).click();
};
