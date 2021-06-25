import assert from 'assert';
import { encodePageData, decodePageData } from '../pageData';

export const testPageData = () => {
  describe('pageData', () => {
    it('Should encoded and decode data with Unicode characters', () => {
      const pageData = { foo: { bar: 'It’s a beautiful day!' } };
      assert.deepEqual(decodePageData(encodePageData(pageData)), pageData);
    });
  });
};
