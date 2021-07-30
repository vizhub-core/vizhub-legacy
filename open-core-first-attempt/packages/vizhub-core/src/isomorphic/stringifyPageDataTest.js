import assert from 'assert';
import { stringifyPageData } from './stringifyPageData';

export const stringifyPageDataTest = () => {
  describe('stringifyPageData', () => {
    it('Should encoded and decode data with Unicode characters', () => {
      const pageData = { foo: { bar: '’' } };
      assert.deepEqual(JSON.parse(stringifyPageData(pageData)), pageData);
    });
    it('Should escape closing scripts', () => {
      const pageData = { foo: { bar: '</script>' } };
      const encoded = stringifyPageData(pageData);
      assert.equal(encoded.indexOf('</script'), -1);
      assert.deepEqual(JSON.parse(encoded), pageData);
    });
  });
};
