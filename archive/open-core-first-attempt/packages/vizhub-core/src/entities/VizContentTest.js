import assert from 'assert';
import { VizContent, getFileText } from './VizContent';

export const vizContentTest = () => {
  describe('VizContent', () => {
    it('should copy expected keys', () => {
      const vizContent = VizContent({});
      assert.deepEqual(Object.keys(vizContent), ['id', 'files']);
    });
  });

  describe('VizContent/getFileText', () => {
    it('should return file text value if present', () => {
      const vizContent = VizContent({
        files: [{ name: 'README.md', text: 'foo' }],
      });
      assert.equal(getFileText(vizContent, 'README.md'), 'foo');
    });
    it('should return undefined if file name not found', () => {
      const vizContent = VizContent({ files: [] });
      assert.equal(getFileText(vizContent, 'README.md'), undefined);
    });
    it('should return undefined if files not defined (defensive)', () => {
      const vizContent = VizContent({});
      assert.equal(getFileText(vizContent, 'README.md'), undefined);
    });
    it('should return undefined if vizContent not defined (defensive)', () => {
      assert.equal(getFileText(null, 'README.md'), undefined);
    });
  });
};
