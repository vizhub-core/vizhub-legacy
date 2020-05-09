import assert from 'assert';
import { navClick } from '../navClick';

export const forkToPrivate = (my) => async () => {

  // Open the privacy dialog.
  await navClick(my.page, '.test-toggle-editor');
  await my.page.waitFor('.test-editor');
  await (await my.page.waitFor('.test-settings')).click();

  // Assert that the viz has the expected privacy state to start with
  const fromPrivacyValue = 'private';
  const fromRadioButton = await my.page.waitFor(
    `.test-settings-dialog-radio-${fromPrivacyValue}`
  );
  const fromRadioButtonIsActive = await my.page.evaluate(
    el => el.getAttribute('data-test-is-active'),
    fromRadioButton
  );
  assert.equal(fromRadioButtonIsActive, 'true');

  // Close the dialog.
  await (await my.page.waitFor('.test-settings-dialog-close')).click();

  // Fork the private viz.
  const { page } = my;
  await navClick(page, '.test-fork');

  const url = page.url();
  const split = url.split('/');
  const id = split[4];

  // Output the link for manual testing.
  console.log();
  console.log('Forked private viz:');
  console.log(url);
  console.log();

  // Open the privacy dialog.
  await navClick(my.page, '.test-toggle-editor');
  await my.page.waitFor('.test-editor');
  await (await my.page.waitFor('.test-settings')).click();

  // Assert that the forked viz has the expected privacy state: private.
  const forkedPrivacyValue = 'private';
  const forkedRadioButton = await my.page.waitFor(
    `.test-settings-dialog-radio-${forkedPrivacyValue}`
  );
  const forkedRadioButtonIsActive = await my.page.evaluate(
    el => el.getAttribute('data-test-is-active'),
    forkedRadioButton
  );
  assert.equal(forkedRadioButtonIsActive, 'true');



  //// Stash the URL for later mobile testing.
  //my.privateVizURL = url;
  //my.privateVizId = id;


  //// Switch to desired privacy setting.
  //const toRadioButton = await my.page.waitFor(
  //  `.test-settings-dialog-radio-${toPrivacyValue}`
  //);
  //await toRadioButton.click();

  //// Assert that private radio button is now active.
  //const toRadioButtonIsActive = await my.page.evaluate(
  //  el => el.getAttribute('data-test-is-active'),
  //  toRadioButton
  //);
  //assert.equal(toRadioButtonIsActive, 'true');

  //// Wait some time to ensure the change was passed to backend fia WebSocket.
  //await new Promise(resolve => setTimeout(resolve, 300));

  //// Close the modal.
  //await (await my.page.waitFor('.test-settings-dialog-close')).click();
};
