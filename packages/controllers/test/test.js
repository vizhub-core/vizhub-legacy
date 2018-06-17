import assert from 'assert';
import { Controllers } from '../src';

describe('Controllers', () => {
  describe('changeDocument', () => {

    it('should invoke gateway.changeDocument', () => {
      let invoked = false;
      const gateway = {
        changeDocument: () => {
          invoked = true;
        }
      };

      const controllers = Controllers(gateway);

      assert(!invoked);
      controllers.changeDocument({}, {});
      assert(invoked);
    });

    // TODO test that jsonDiff is called
  });
});
