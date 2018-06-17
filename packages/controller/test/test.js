import assert from 'assert';
import { Controller } from '../src';

describe('Controller', () => {
  describe('changeDocument', () => {

    it('should invoke gateway.changeDocument', () => {
      let invoked = false;
      const gateway = {
        changeDocument: () => {
          invoked = true;
        }
      };

      const controller = Controller(gateway);

      assert(!invoked);
      controller.changeDocument({}, {});
      assert(invoked);
    });

    // TODO test that jsonDiff is called
  });
});
